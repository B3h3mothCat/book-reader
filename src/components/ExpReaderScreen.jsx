import CssPopupCustomizer from "./CssPopupCustomizer";
import ReaderNavButtons from "./Book/ReaderNavButtons";
import Button from "../modules/Button/Button";

import { useState, useEffect } from "react";
import { useCustomizer } from "../Context/ReaderCustomizer";


function splitIntoSentences(text) {
    return text.split(/[\.\?!]\s/);
}

export default function ExpReaderScreen({ file, chapters }) {
    const { popupVisible, settings, openPopup, closePopup, saveSettings } = useCustomizer()
    const [sentences, setSentences] = useState([]);

    const [currentChapterIndex, setCurrentChapterIndex] = useState(0); //

    useEffect(() => {
        if (chapters && chapters.length > 0) {
            const chapterIndex = chapters.findIndex((chapter) => chapter.content === file); // тут сравниваются пути, а не сам контент
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
        <div className="initial-wrapper" style={{ backgroundColor: settings.color }}>
            <div className="text-wrapper" style={{ width: settings.width }}>
                <h1>Название главы</h1>
                {sentences.map((sentanse, index) => (
                    <p
                        key={index}
                        style={{ fontSize: settings.fontSize }}
                    >{sentanse}</p>
                ))}
                <Button onClick={openPopup}>Customize Page</Button>
                {/* Должно быть в навбаре */}

                {chapters && (
                    <ReaderNavButtons
                        currentChapterIndex={currentChapterIndex}
                        chapters={chapters}
                    />
                )}

            </div>
            {popupVisible && <CssPopupCustomizer onClose={closePopup} onSave={saveSettings} />}
            {/* всплывающее окно (возможно отдельный компонент?) */}

        </div>
    )
}

