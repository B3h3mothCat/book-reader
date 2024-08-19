import { useLocation, useParams } from "react-router-dom"
import ExpReaderScreen from "../BookReaderScreen"
import CustomizerProvider from "../Customizer/CustomizerContext"

export default function SingleChapter() {
    const { chapterId } = useParams()
    const { chapters, title } = useLocation().state

    return (
        <div>
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
