import { useState, useEffect } from "react"
import ReactMarkdown from 'react-markdown'

import './DevNews.css'

export default function DevNews() {
    const [markdown, setMarkdown] = useState('')

    useEffect(() => {
        fetch('/documentation/readme.md')
            .then(res => res.text())
            .then(text => setMarkdown(text))
    }, [])

    return (
        <>
            <h3>Developer News</h3>
            <div className="news-container custom-scrollbar no-select">
                {/* <ReactMarkdown>{markdown}</ReactMarkdown> */}
                <pre>{markdown}</pre>
            </div>
        </>
    )
}