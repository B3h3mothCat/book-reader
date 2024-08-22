import { useLocation, useParams } from "react-router-dom"
import ReaderScreen from "../../features/Reader/ReaderScreen"
import CustomizerProvider from "../../features/Customizer/CustomizerContext"

export default function SingleChapter() {
    const { chapterId } = useParams()
    const { chapters, title } = useLocation().state

    return (
        <div>
            <CustomizerProvider>
                <ReaderScreen
                    file={decodeURIComponent(chapterId)}
                    chapters={chapters}
                    title={title}
                ></ReaderScreen>
            </CustomizerProvider>
        </div>
    )
}

// нужен ли этот компонент "прокладка" ?
// похоже что нужен! Тут мы можем обернуть ридер в контекст! [навигация страниц]
// попробовать добавить сюда FileReader <=