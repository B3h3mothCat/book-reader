import { useNavigate } from "react-router-dom";
import Button from "../../modules/Button/Button";

export default function ReaderNavButtons({ currentChapterIndex, chapters }) {
    const navigate = useNavigate();

    const handlePrevious = () => {
        if (currentChapterIndex > 0) {
            const prevIndex = currentChapterIndex - 1;
            const prevChapter = chapters[prevIndex];
            navigate(`/chapter/${encodeURIComponent(prevChapter.content)}`, { state: { chapters } })
        }
    }

    const handleNext = () => {
        if (currentChapterIndex < chapters.length - 1) {
            const nextIndex = currentChapterIndex + 1;
            const nextChapter = chapters[nextIndex]
            navigate(`/chapter/${encodeURIComponent(nextChapter.content)}`, { state: { chapters } })
        }
    }

    return (
        <>
            {currentChapterIndex > 0 && (
                <Button onClick={handlePrevious}>Prev</Button>
            )}

            {currentChapterIndex < chapters.length - 1 && (
                <Button onClick={handleNext}>Next</Button>
            )}
        </>
    )
}


// change Buttons to => some small element