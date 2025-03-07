import * as EPub from "epub";
import * as path from "path";

export class EpubReader {
    private text: string[] = [];
    private index: number = 0;
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = path.join(process.cwd(), filePath);
        this.loadBook();
    }
  
    async loadBook() {
      return new Promise<void>((resolve, reject) => {
        const epub = new EPub(this.filePath);
  
        epub.on("end", async () => {
          try {
            const allText: string[] = [];
            for (const id of Object.keys(epub.flow)) {
              const chapter = await this.getChapterText(epub, id);
              allText.push(chapter);
            }
            this.text = allText.join(" ").split(/\s+/);
            
            resolve();
          } catch (error) {
            reject(error);
          }
        });
  
        epub.on("error", (err) => reject(err));
        epub.parse();
      });
    }
  
    private getChapterText(epub: EPub, id: string): Promise<string> {
      return new Promise((resolve, reject) => {
        epub.getChapter(id, (error, text) => {
          if (error) reject(error);
          resolve(text.replace(/<[^>]+>/g, "")); // Remove HTML tags
        });
      });
    }
  
    getNextWords(): string {
      if (this.index >= this.text.length) {
        return "End of book reached.";
      }
      const words = this.text.slice(this.index, this.index + 50).join(" ");
      this.index += 50;
      return words;
    }
  }
  