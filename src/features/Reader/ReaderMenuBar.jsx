// create custom buttons for small elements ?
import { Link } from "react-router-dom"
import Button from "../../modules/Button/Button"
import ReaderNavButtons from "./ReaderNavButtons"
import { useState, useEffect } from "react"
import settingsIcon from "../../assets/img/settings.svg"
import styled from 'styled-components'

export default function ReaderMenuBar({ currentChapterIndex, chapters, title, openPopup }) {

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const topPosition = window.scrollY;
            setIsVisible(topPosition <= 50); // Hide the bar if the user scrolls more than 50px
        };

        const handleMouseMove = (e) => {
            if (e.clientY <= 65) { // If the mouse is near the top of the screen
                setIsVisible(true);
            } else if (window.scrollY > 50) {
                setIsVisible(false); // Hide again if not near top and scrolled
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);



    return (
        <Div_ReaderMenuWrap isVisible={isVisible}>
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
        </Div_ReaderMenuWrap>
    )
}

const Div_ReaderMenuWrap = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isVisible'
})`
    display: flex;
    height: 50px;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    border: 1px gray solid;
    border-radius: 5px;
    position: fixed;
    background-color: var(--background-module-light);
    transition: transform 0.3s ease-in-out; 
    transform: translateY(${props => (props.isVisible ? '0' : '-100%')}); 
`
