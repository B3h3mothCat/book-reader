import { BOOKS_DATA } from "../../mock/data"
import { Link } from "react-router-dom";

export default function LibraryOfBooks() {
    const books = BOOKS_DATA

    return (
        <div className="catalog-container">
            <h3>Catalog page</h3>
            <div className="book-list">
                {books.map((book, index) => (
                    <div
                        className="book-unit"
                        key={index}
                    >
                        <Link
                            to={`/book-front/${encodeURIComponent(book.title)}`}
                            state={{
                                chapters: book.chapters,
                                title: book.title,
                                description: book.description,
                            }}
                        >
                            {book.title}
                        </Link>
                        <br />
                        <div className="book-picture">
                            <img src={book.picture} alt={'title'} />
                        </div>
                    </div >
                ))}
            </div>
        </div>
    );
}
