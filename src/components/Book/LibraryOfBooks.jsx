import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BOOKS_DATA } from "../../mock/data"
import MainNavBar from "../MainNavBar";
import BookUnit from './BookUnit'
import SearchBar from "./SearchBar";
import useModal from '../../Hooks/useModal'

import BookFilter from "./BookFilter";

import './catalog.css'

export default function LibraryOfBooks() {
    const books = BOOKS_DATA

    const [searchResult, setSearchReasult] = useState([])
    const { isModalOpen, openModal, modalRef } = useModal(false)

    function handleSearchResult(result) {
        setSearchReasult(result)
        openModal()
    }

    //
    const [filteredBooks, setFilteredBooks] = useState(books);

    const applyFilters = (filters) => {
        const { genres, status, adultRating } = filters;
        const filtered = books.filter((book) => {
            const { genres: bookGenres, adultRating: bookAdultRating, titleStatus: bookStatus } = book.filterInfo;
            const matchGenres = genres.length ? genres.some((genre) => bookGenres.includes(genre)) : true;
            const matchStatus = status ? bookStatus === status : true;
            const matchAdultRating = adultRating ? bookAdultRating === adultRating : true;
            return matchGenres && matchStatus && matchAdultRating;
        });
        setFilteredBooks(filtered);
    };

    const clearFilters = () => {
        setFilteredBooks(books);
    };
    //

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
