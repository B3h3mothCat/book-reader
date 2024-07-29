import { useState } from "react"

export default function TextFileOpener({ inputContent }) {

    function handleFileOpen(e) {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onload = (e) => {
            const content = e.target.result;
            inputContent(content)
        }

        reader.readAsText(file)
    }

    return (
        <input type="file" onChange={handleFileOpen} />
    )
}