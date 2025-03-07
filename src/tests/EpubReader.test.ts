const { EpubReader } = require("../utils/EpubReader");
import * as path from "path";
describe("EpubReader", () => {
    // let epubReader = new EpubReader("src/assets/books/book.epub");
    const filePath = path.join(process.cwd(), "src/assets/books/book.epub");
    const epubReader = new EpubReader(filePath);
    test("first 50 words are returned correctly", () => {
        expect(epubReader.getNextWords()).toBe("some test");
    })

    test("next 50 words are returned correctly", () => {
        expect(epubReader.getNextWords()).toBe("some test");
    })
})

