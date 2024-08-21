import styled from "styled-components"
import loaderIcon from "../../assets/loader.gif"

export default function LoaderScreen() {
    return (
        <Img_Icon
            src={loaderIcon}
            alt="Loading..." />
    )
}


const Img_Icon = styled.img`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 300px;  
    max-height: 300px; 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2; 
`