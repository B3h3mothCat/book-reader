import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BOOKS_DATA } from "../../mock/data"
import MainNavBar from "../MainNavBar";
import BookUnit from './BookUnit'
import SearchBar from "./SearchBar";
import useModal from '../../Hooks/useModal'

export default function LibraryOfBooks() {
    const books = BOOKS_DATA

    const [searchResult, setSearchReasult] = useState([])
    const { isModalOpen, openModal, modalRef } = useModal(false)

    function handleSearchResult(result) {
        setSearchReasult(result)
        openModal()
    }


    return (
        <>
            <MainNavBar />
            <SearchBar books={books} onSearch={handleSearchResult}></SearchBar>
            <div className="catalog-container">
                <div className="book-list">
                    {books.map((book, index) => (
                        <BookUnit book={book} key={index} />
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div
                        className="book-list-modal"
                        ref={modalRef}
                    >
                        {searchResult.map((book, index) => (
                            <BookUnit book={book} key={index} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
