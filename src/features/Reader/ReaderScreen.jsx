import { useState, useEffect } from "react";
import { useCustomizer } from "../Customizer/CustomizerContext";
import CustomizerPopup from "../Customizer/CustomizerPopup"
import ReaderMenuBar from "./ReaderMenuBar";
import styled from "styled-components"

// function splitIntoSentences(text) {
//     return text.split(/[\.\?!]\s/);
// }

function splitIntoParagraphs(text) {
    return text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0);
}

export default function ReaderScreen({ file, chapters, title: initialTitle }) {
    const { settings, saveSettings, popupVisible, openPopup, closePopup } = useCustomizer()

    const [paragraphs, setParagraphs] = useState([]);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0); //
    const [title, setTitle] = useState(initialTitle);


    useEffect(() => {
        if (chapters && chapters.length > 0) {
            const chapterIndex = chapters.findIndex((chapter) => chapter.content === file); // тут сравниваются пути, либо контент (что плохо)
            setCurrentChapterIndex(chapterIndex);

            const chapter = chapters[chapterIndex];

            if (chapter && chapter.content.endsWith('.txt')) {
                fetchContent(chapter.content);
            } else if (chapter) {
                setParagraphs(splitIntoParagraphs(chapter.content));
            }
        } else {
            if (file.endsWith('.txt')) {
                fetchContent(file);
            } else {
                setParagraphs(splitIntoParagraphs(file));
            }
        }

    }, [file, chapters]);

    async function fetchContent(filePath) {
        const response = await fetch(filePath);
        const text = await response.text();
        setParagraphs(splitIntoParagraphs(text));
    }

    return (


        <Div_InitialWrapper style={{ backgroundColor: settings.color }}>

            {chapters && (
                <ReaderMenuBar
                    currentChapterIndex={currentChapterIndex}
                    chapters={chapters}
                    openPopup={openPopup}

                    title={title}
                />
            )}

            <Div_TextWrapper style={{
                width: settings.width + '%',
                textAlign: settings.textPosition,
                fontSize: settings.fontSize + 'px',
                color: settings.textColor

            }}>
                <h1>Название главы</h1>
                {paragraphs.map((item, index) => (
                    <p
                        key={index}
                        style={{ textIndent: settings.textIndent + '%' }}
                    >{item}</p>
                ))}

            </Div_TextWrapper>

            {popupVisible && (
                <CustomizerPopup
                    onSave={saveSettings}
                    onClose={closePopup}
                ></CustomizerPopup>
            )}

        </Div_InitialWrapper>
    )
}

const Div_InitialWrapper = styled.div`
     display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    width: calc(100vw - 17px); // temp solution
    background-color: var(--background-module-light); 
`
const Div_TextWrapper = styled.div`
    margin-top: 5px;
    height: 100%;
    font-family:Arial, Helvetica, sans-serif;
    white-space: normal;
    text-align: start;
    padding-top: 50px;    /* padding for MenuBar (maybe try outlet there?)*/
    padding-left: 1%;
    padding-right: 1%;
`