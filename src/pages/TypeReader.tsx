import { useState } from "react";

export default function TypeReader() {
    return (
        <TypeBox/>
    )
}

function TypeBox() {
    const [value, setValue] = useState("");

    return (
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type here..."
            style={{
            border: "none",
            outline: "none", // Prevents the default focus outline
            backgroundColor: "transparent", // Makes the background transparent
            padding: "8px",
            fontSize: "16px",
            width: "100%",
            }}
        />
    );
}