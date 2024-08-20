import { useState, useEffect } from "react"
import ReactMarkdown from 'react-markdown'

import styled from "styled-components"


export default function DevNews() {
    const [content, setContent] = useState('')

    useEffect(() => {
        fetch('/documentation/readme.md')
            .then(res => res.text())
            .then(text => setContent(text))
    }, [])

    return (
        <>
            <h3>Developer News</h3>
            <Div_NewsContainer className="custom-scrollbar no-select">
                {/* <ReactMarkdown>{content}</ReactMarkdown> */}
                <pre>{content}</pre>
            </Div_NewsContainer>
        </>
    )
}

const Div_NewsContainer = styled.div`
    background-color: var(--background-module-light);
    height: 650px;
    width: 550px;
    border-radius: 6px;
    overflow-x: hidden;
    overflow-y: auto;
    text-align: start;
    padding-left: 1%;
    font-size: 15px;
`;