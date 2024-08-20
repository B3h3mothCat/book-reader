import styled from "styled-components"
import loaderIcon from "../../assets/loader.gif"

export default function LoaderScreen() {
    return (
        <div className="container">
            <img src={loaderIcon} alt="Loading..." />
        </div>
    )
}