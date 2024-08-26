import { Link } from "react-router-dom"
import styled from "styled-components"

export default function BookUnit({ book }) {
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
    border: 1px solid gray;
    height: 290px;
    width: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    position: relative;
    z-index: 1;
    transition: background-color 0.3s ease, box-shadow 0.25s ease;

  &:hover {
    /* box-shadow: 0 0 10px rgba(223, 221, 221, 0.479); */
    box-shadow: 0 0 10px var(--focus-color-light);
  }

    img {
    height: 225px;
    width: 160px;
    object-fit: cover; 
    border-radius: 10px;
    }  

    a {
    height: 100%; 
    width: 100%; 
    }
`