// create custom buttons for small elements ?
import { Link } from "react-router-dom"
import Button from "../../modules/Button/Button"

import ReaderNavButtons from "./ReaderNavButtons"

export default function ReaderMenuBar({ currentChapterIndex, chapters, title, openCustomizer }) {


    return (
        <div className="reader-menu-wrap">
            <Link to={'/'}>Home</Link>
            <div>
                <div className="">Название книги</div>
                <div className="">{title}</div>
            </div>
            <div>
                <div>Оглавление</div>
                <div>Том Глава</div>
            </div>
            <ReaderNavButtons
                currentChapterIndex={currentChapterIndex}
                chapters={chapters}
            ></ReaderNavButtons>

            <Button
                onClick={openCustomizer}
            >Customize Page</Button>
        </div>
    )
}