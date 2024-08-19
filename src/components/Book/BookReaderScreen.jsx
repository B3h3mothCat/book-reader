import CustomizerPopup from "../Customizer/CustomizerPopup"
import Button from "../../modules/Button/Button";
import { useState, useEffect } from "react";
import ReaderMenuBar from "./ReaderMenuBar";
//original customizer context
import { useCustomizer } from "../Customizer/CustomizerContext";

import ModalWrapper from "../ui/ModalWrapper";


function splitIntoSentences(text) {
    return text.split(/[\.\?!]\s/);
}

export default function BookReaderScreen({ file, chapters, title: initialTitle }) {
    const { settings, saveSettings, popupVisible, openPopup, closePopup } = useCustomizer()

    const [sentences, setSentences] = useState([]);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0); //
    const [title, setTitle] = useState(initialTitle);


    // ModalWrapper logic
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    function openCustomizer() {
        setIsModalOpen(true)
    }


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


        <div className="initial-wrapper" style={{ backgroundColor: settings.color }}>

            {chapters && (
                <ReaderMenuBar
                    currentChapterIndex={currentChapterIndex}
                    chapters={chapters}
                    // openCustomizer={openCustomizer}
                    openPopup={openPopup}

                    title={title}
                />
            )}

            <div className="text-wrapper" style={{
                width: settings.width + '%',
                textAlign: settings.textPosition

            }}>
                <h1>Название главы</h1>
                {sentences.map((sentanse, index) => (
                    <p
                        key={index}
                        style={{ fontSize: settings.fontSize + 'px' }}
                    >{sentanse}</p>
                ))}

            </div>

            {popupVisible && (
                <CustomizerPopup
                    onSave={saveSettings}
                    onClose={closePopup}
                ></CustomizerPopup>
            )}

        </div>
    )
}

