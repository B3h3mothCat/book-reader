import { useState } from "react";
import { BOOKS_DATA_RU } from "../../mock/data_ru"
import MainNavBar from "../MainNavBar";
import BookUnit from './BookUnit'
import SearchBar from "./SearchBar";
import useModal from '../../Hooks/useModal'

import BookFilter from "./BookFilter";
import { useBookFilter } from "../../Hooks/useBookFilter";

import './catalog.css'

export default function LibraryOfBooks() {

    const books = BOOKS_DATA_RU

    const [searchResult, setSearchReasult] = useState([])
    const { isModalOpen, openModal, modalRef } = useModal(false)

    const { filteredBooks, applyFilters, clearFilters } = useBookFilter(books);

    function handleSearchResult(result) {
        setSearchReasult(result)
        openModal()
    }

    return (
        <>
            <MainNavBar />
            <SearchBar books={filteredBooks} onSearch={handleSearchResult}></SearchBar>
            <div className="catalog-container">
                <div className="book-list">
                    {filteredBooks.map((book, index) => (
                        <BookUnit book={book} key={index} />
                    ))}
                </div>

                <BookFilter onApplyFilters={applyFilters} onClearFilters={clearFilters} />
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
