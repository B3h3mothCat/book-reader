import { useLocation, useParams } from "react-router-dom"
import ExpReaderScreen from "../ExpReaderScreen"
import CustomizerProvider from "../../Context/ReaderCustomizer"

export default function SingleChapter() {
    const { chapterId } = useParams()
    const { chapters, title } = useLocation().state

    return (
        <div>
            <h3>Chapter content</h3>
            <CustomizerProvider>
                <ExpReaderScreen
                    file={decodeURIComponent(chapterId)}
                    chapters={chapters}
                    title={title}
                ></ExpReaderScreen>
            </CustomizerProvider>
        </div>
    )
}

// нужен ли этот компонент "прокладка" ?
// похоже что нужен! Тут мы можем обернуть ридер в контекст! [навигация страниц]
