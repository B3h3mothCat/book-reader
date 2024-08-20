import { useState } from "react";
// import { BOOKS_DATA_RU } from "../../mock/data_ru"
import BookUnit from './BookUnit'
import SearchBar from "../ui/SearchBar";
import BookFilter from "./BookFilter";
import { useBookFilter } from "../../Hooks/useBookFilter";
import useBooksData from "../../Hooks/useBooksData";

import styled from "styled-components";


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
            <Div_CatalogContainer>
                <Div_BookList>
                    {filteredBooks.map((book, index) => (
                        <BookUnit book={book} key={index} />
                    ))}
                </Div_BookList>

                <BookFilter onApplyFilters={applyFilters} onClearFilters={clearFilters} />
            </Div_CatalogContainer>

            {isSearchOpen && (
                <Div_ModalOverlay onClick={() => setIsSearchOpen(false)}>
                    <Div_BookListModal onClick={(e) => e.stopPropagation()}>
                        {searchResult.map((book, index) => (
                            <BookUnit book={book} key={index} />
                        ))}
                    </Div_BookListModal>
                </Div_ModalOverlay>
            )}
        </>
    );
}

const Div_ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6); 
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
`;

const Div_CatalogContainer = styled.div`
    display: flex;
    background-color: var(--background-color-light);
    padding-left: 3%;
    padding-right: 3%;
    gap: 1%;
    margin-left: auto;
    margin-right: auto;
    overflow-x: hidden;
`;

const Div_BookList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5em;
    width: 100%;
    padding: 1%;
    background-color: var(--background-module-light);
    height: 100%;
    border-radius: 5px;
    overflow-x: hidden;
`;

const Div_BookListModal = styled.div`
    display: flex;
    position: fixed;
    top: 30%; 
    left: 50%; 
    transform: translate(-50%, -50%); /* Centers modal */
    background-color: var(--background-module-light);
    padding: 20px;
    z-index: 99;
    box-shadow: 0 0 10px rgba(223, 221, 221, 0.479);
    gap: 5px;
`;