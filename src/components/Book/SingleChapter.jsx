import { useLocation, useParams } from "react-router-dom"
import BookReaderScreen from "./BookReaderScreen"
import CustomizerProvider from "../Customizer/CustomizerContext"

export default function SingleChapter() {
    const { chapterId } = useParams()
    const { chapters, title } = useLocation().state

    return (
        <div>
            <CustomizerProvider>
                <BookReaderScreen
                    file={decodeURIComponent(chapterId)}
                    chapters={chapters}
                    title={title}
                ></BookReaderScreen>
            </CustomizerProvider>
        </div>
    )
}

// нужен ли этот компонент "прокладка" ?
// похоже что нужен! Тут мы можем обернуть ридер в контекст! [навигация страниц]
