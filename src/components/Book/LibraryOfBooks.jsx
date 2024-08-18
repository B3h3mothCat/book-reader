import { useState } from "react";
// import { BOOKS_DATA_RU } from "../../mock/data_ru"
import BookUnit from './BookUnit'
import SearchBar from "../ui/SearchBar";
import BookFilter from "./BookFilter";
import { useBookFilter } from "../../Hooks/useBookFilter";
import useBooksData from "../../Hooks/useBooksData";


import './catalog.css'

export default function LibraryOfBooks() {

    const { booksData, loading, error } = useBooksData() // fetching from fake API
    const [searchResult, setSearchReasult] = useState([])
    const { filteredBooks, applyFilters, clearFilters } = useBookFilter(booksData);



    const [isSearchOpen, setIsSearchOpen] = useState(false)

    function handleSearchResult(result) {
        setSearchReasult(result)
        setIsSearchOpen(true)
    }

    return (
        <>
            <SearchBar books={filteredBooks} onSearch={handleSearchResult}></SearchBar>
            <div className="catalog-container">
                <div className="book-list">
                    {filteredBooks.map((book, index) => (
                        <BookUnit book={book} key={index} />
                    ))}
                </div>

                <BookFilter onApplyFilters={applyFilters} onClearFilters={clearFilters} />
            </div>

            {isSearchOpen && (
                <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
                    <div className="book-list-modal" onClick={(e) => e.stopPropagation()}>
                        {searchResult.map((book, index) => (
                            <BookUnit book={book} key={index} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
