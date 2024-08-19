// create custom buttons for small elements ?
import { Link } from "react-router-dom"
import Button from "../../modules/Button/Button"
import ReaderNavButtons from "../Book/ReaderNavButtons"

import settingsIcon from "../../assets/img/settings.svg"

export default function ReaderMenuBar({ currentChapterIndex, chapters, title, openPopup }) {


    return (
        <div className="reader-menu-wrap">
            <Link to={'/'}>Home</Link>
            <div>
                <div className="">Название книги</div>
                <div className="">{title}</div>
            </div>

            <ReaderNavButtons
                currentChapterIndex={currentChapterIndex}
                chapters={chapters}
            ></ReaderNavButtons>

            <Button onClick={openPopup}>
                <img src={settingsIcon} alt="settings" />
                {/* Customize Page */}
            </Button>
        </div>
    )
}