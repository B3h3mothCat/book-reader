import styled from "styled-components"
import loaderIcon from "../../assets/loader.gif"
import { useState } from "react"

export default function LoaderScreen({ message }) {
    return (
        <>
            <H1_Message>{message}</H1_Message>
            <Img_Icon
                src={loaderIcon}
                alt="Loading..." />
        </>

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

const H1_Message = styled.h1`
    

`