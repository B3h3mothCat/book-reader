import { Link } from "react-router-dom"

export default function BookUnit({ book }) {
    return (
        <div className="book-unit">
            <Link
                to={`/book-front/${encodeURIComponent(book.title)}`}
                state={{
                    chapters: book.chapters,
                    title: book.title,
                    description: book.description,
                    book: book,
                }}
            >
                <div className="book-picture">
                    <img src={book.picture} alt={book.title} />
                </div>
                {book.title}
            </Link>
        </div>
    )
}