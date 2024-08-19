// create custom buttons for small elements ?
import { Link } from "react-router-dom"
import Button from "../../modules/Button/Button"
import ReaderNavButtons from "../Book/ReaderNavButtons"

import settingsIcon from "../../assets/img/settings.svg"
import styled from 'styled-components'

export default function ReaderMenuBar({ currentChapterIndex, chapters, title, openPopup }) {


    return (
        <StyledReaderMenuWrap>
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
            </Button>
        </StyledReaderMenuWrap>
    )
}

const StyledReaderMenuWrap = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  border: 1px gray solid;
  border-radius: 5px;
`
