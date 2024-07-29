import TextFileOpener from "../components/TextFileOpener/TextFileOpener"
import ExpReaderScreen from "../components/ExpReaderScreen"
import CustomizerProvider from "../Context/ReaderCustomizer"

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
                <ExpReaderScreen file={fileContent}></ExpReaderScreen>
            </CustomizerProvider>
        </>
    )

}

// has to be changed since ExpReader now works with paths