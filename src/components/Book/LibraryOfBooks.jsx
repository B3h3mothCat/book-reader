import { useState } from "react";
// import { BOOKS_DATA_RU } from "../../mock/data_ru"
import MainNavBar from "../MainNavBar";
import BookUnit from './BookUnit'
import SearchBar from "../ui/SearchBar";
import BookFilter from "./BookFilter";
import { useBookFilter } from "../../Hooks/useBookFilter";

import useBooksData from "../../Hooks/useBooksData";

import ModalWrapper from "../ui/ModalWrapper";

import './catalog.css'

export default function LibraryOfBooks() {

    const { booksData, loading, error } = useBooksData() // fetching from fake API
    const [searchResult, setSearchReasult] = useState([])
    const { filteredBooks, applyFilters, clearFilters } = useBookFilter(booksData);


    // ModalWrapper logic
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleSearchResult(result) {
        setSearchReasult(result)
        setIsModalOpen(true)
    }

    return (
        <>
            {/* <MainNavBar /> */}
            <SearchBar books={filteredBooks} onSearch={handleSearchResult}></SearchBar>
            <div className="catalog-container">
                <div className="book-list">
                    {filteredBooks.map((book, index) => (
                        <BookUnit book={book} key={index} />
                    ))}
                </div>

                <BookFilter onApplyFilters={applyFilters} onClearFilters={clearFilters} />
            </div>


            <ModalWrapper isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="book-list-modal">
                    {searchResult.map((book, index) => (
                        <BookUnit book={book} key={index} />
                    ))}
                </div>
            </ModalWrapper>
        </>
    );
}
