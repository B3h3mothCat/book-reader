import { BOOKS_DATA } from "../../mock/data"
import { Link } from "react-router-dom";

export default function LibraryOfBooks() {
    const books = BOOKS_DATA

    return (
        <>
            <h3>Catalog page</h3>
            {books.map((book, index) => (
                <div key={index}>
                    <Link
                        to={`/list/${encodeURIComponent(book.title)}`}
                        state={{
                            chapters: book.chapters,
                            title: book.title,
                            description: book.description,
                        }}
                    >
                        {book.title}
                    </Link>
                    <br />
                    <span>{book.description}</span>
                </div >
            ))
            }
        </>
    );
}
