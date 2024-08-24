import { useLocation, useParams } from "react-router-dom"
import ReaderScreen from "../../features/Reader/ReaderScreen"
import CustomizerProvider from "../../features/Customizer/CustomizerContext"

export default function SingleChapter() {
    const { chapterId } = useParams()
    const { chapters, title } = useLocation().state

    return (
        <>
            <CustomizerProvider>
                <ReaderScreen
                    file={decodeURIComponent(chapterId)}
                    chapters={chapters}
                    title={title}
                ></ReaderScreen>
            </CustomizerProvider>
        </>
    )
}

// классификация компонента <= container
// похоже что нужен! Тут мы можем обернуть ридер в контекст! [навигация страниц]
// попробовать добавить сюда FileReader <=