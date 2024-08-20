import { Link } from "react-router-dom"
import styled from "styled-components"

export default function AccountBookUnit({ book }) {
    return (
        <Div_BookUnit>
            <Link
                to={`/book-front/${encodeURIComponent(book.title)}`}
                state={{
                    chapters: book.chapters,
                    title: book.title,
                    description: book.description,
                    book: book,
                }}
            >
                <img src={book.picture} alt={book.title} />
                {book.title}
            </Link>
        </Div_BookUnit>

    )
}

const Div_BookUnit = styled.div`
    display: flex;
    align-items: center;
    background-color: var(--background-module-light);

    img {
        height: 120px;
        width: 120px;
        margin-right: 30px; 
        object-fit: cover;
        border-radius: 50%;
        border: 1px grey solid;
    }

    a {
        display: flex;
        align-items: center;
    }

`;