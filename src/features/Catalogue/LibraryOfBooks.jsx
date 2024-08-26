import { useState } from "react";
// import { BOOKS_DATA_RU } from "../../mock/data_ru"
import BookUnit from '../../components/Book/BookUnit'
import SearchBar from "../../components/ui/SearchBar";
import BookFilter from "./BookFilter";
import { useBookFilter } from "./useBookFilter";
import useBooksData from "../../Hooks/useBooksData";
import styled from "styled-components";

import BookModal from "./BookModal";

export default function LibraryOfBooks() {

    const { booksData, loading, error } = useBooksData() // fetching from fake API
    const [searchResult, setSearchReasult] = useState([])
    const { filteredBooks, applyFilters, clearFilters } = useBookFilter(booksData);
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const [hoveredBook, setHoveredBook] = useState(null);

    function handleSearchResult(result) {
        setSearchReasult(result)
        setIsSearchOpen(true)
    }


    // console.log(hoveredBook?.title);


    return (
        <>

            <Div_CatalogContainer >
                <Div_BookListContainer>
                    <SearchBar books={filteredBooks} onSearch={handleSearchResult}></SearchBar>
                    <Div_BookList
                        style={{ position: 'relative' }}
                    >
                        {filteredBooks.map((book, index) => (
                            <BookUnit
                                book={book}
                                key={index}
                            // onMouseEnter={() => setHoveredBook(book)}
                            // onMouseLeave={() => setHoveredBook(null)}
                            />
                        ))}
                    </Div_BookList>
                    {hoveredBook && (
                        <BookModal book={hoveredBook} />
                    )}
                </Div_BookListContainer>
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
    margin-top: 1%;
    display: flex;
    justify-content: center;
    background-color: var(--background-color-light);
    gap: 20px;
    overflow-x: hidden;
    min-width: var(--container-width);
`;

const Div_BookList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    max-width: 920px;
    background-color: var(--background-module-light);
    height: 100%;
    overflow-x: hidden;
    gap: 10px;
    padding: 10px;
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

const Div_BookListContainer = styled.div`
        display: flex;
        flex-direction: column; 
        max-width: 65%;
`;