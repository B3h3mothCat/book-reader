import TextFileOpener from "../components/TextFileOpener/TextFileOpener"
import ReaderScreen from "../features/Reader/ReaderScreen"
import CustomizerProvider from "../features/Customizer/CustomizerContext"


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
                <ReaderScreen file={fileContent}></ReaderScreen>
            </CustomizerProvider>
        </>
    )

}

// has to be changed since ExpReader now works with paths