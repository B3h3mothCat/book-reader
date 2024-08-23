import { useState, useEffect } from "react";
import { useCustomizer } from "../Customizer/CustomizerContext";
import CustomizerPopup from "../Customizer/CustomizerPopup"
import ReaderMenuBar from "./ReaderMenuBar";
import styled from "styled-components"

function splitIntoSentences(text) {
    return text.split(/[\.\?!]\s/);
}

export default function ReaderScreen({ file, chapters, title: initialTitle }) {
    const { settings, saveSettings, popupVisible, openPopup, closePopup } = useCustomizer()

    const [sentences, setSentences] = useState([]);
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
                setSentences(splitIntoSentences(chapter.content));
            }
        } else {
            if (file.endsWith('.txt')) {
                fetchContent(file);
            } else {
                setSentences(splitIntoSentences(file));
            }
        }

    }, [file, chapters]);

    async function fetchContent(filePath) {
        const response = await fetch(filePath);
        const text = await response.text();
        setSentences(splitIntoSentences(text));
    }

    return (


        <Div_InitialWrapper style={{ backgroundColor: settings.color }}>

            {chapters && (
                <ReaderMenuBar
                    currentChapterIndex={currentChapterIndex}
                    chapters={chapters}
                    // openCustomizer={openCustomizer}
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
                {sentences.map((sentanse, index) => (
                    <p
                        key={index}
                    >{sentanse}</p>
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