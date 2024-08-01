import { BOOKS_DATA } from "../../mock/data"
import { Link } from "react-router-dom";
import MainNavBar from "../MainNavBar";

export default function LibraryOfBooks() {
    const books = BOOKS_DATA

    return (
        <>
            <MainNavBar />
            <div className="catalog-container">
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
                                <div className="book-picture">
                                    <img src={book.picture} alt={'title'} />
                                </div>
                                {book.title}
                            </Link>
                        </div >
                    ))}
                </div>
            </div>
        </>

    );
}
