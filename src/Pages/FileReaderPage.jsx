import TextFileOpener from "../components/TextFileOpener/TextFileOpener"
import BookReaderScreen from "../components/Book/BookReaderScreen"
import CustomizerProvider from "../components/Customizer/CustomizerContext"


import { useState } from "react"

export default function FileReaderPage() {
    const [fileContent, setFileContent] = useState('')

    function handleFile(file) {
        setFileContent(file)
    }

    return (
        <>
            <h3>File Reader!</h3>
            <TextFileOpener inputContent={handleFile}></TextFileOpener>


            <CustomizerProvider>
                <BookReaderScreen file={fileContent}></BookReaderScreen>
            </CustomizerProvider>
        </>
    )

}

// has to be changed since ExpReader now works with paths