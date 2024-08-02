import { BOOKS_DATA } from "../../mock/data"
import { Link } from "react-router-dom";
import MainNavBar from "../MainNavBar";
import { useState } from "react";
import BookUnit from './BookUnit'

import SearchBar from "./SearchBar";

export default function LibraryOfBooks() {
    const books = BOOKS_DATA
    const [searchResult, setSearchReasult] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleSearchResult(result) {
        setSearchReasult(result)
        setIsModalOpen(true)
    }

    return (
        <>
            <MainNavBar />

            <SearchBar books={books} onSearch={handleSearchResult}></SearchBar>

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
                                    book: book,
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

            {isModalOpen && (
                <>
                    <button onClick={() => setIsModalOpen(false)}>Close</button>
                    <div className="book-list">Results of search:
                        {searchResult.map((book, index) => (
                            <BookUnit book={book} key={index} />
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
