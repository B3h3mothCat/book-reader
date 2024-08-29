import { useState, useRef } from "react";
// import { BOOKS_DATA_RU } from "../../mock/data_ru"
import BookUnit from '../../components/Book/BookUnit'
import SearchBar from "../../components/ui/SearchBar";
import BookFilter from "./BookFilter";
import { useBookFilter } from "./useBookFilter";
import useBooksData from "../../Hooks/useBooksData";
import styled from "styled-components";


export default function LibraryOfBooks() {
    const { booksData, loading, error } = useBooksData() // fetching from fake API
    const [searchResult, setSearchReasult] = useState([])
    const { filteredBooks, applyFilters, clearFilters } = useBookFilter(booksData);
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const [hoveredBook, setHoveredBook] = useState([]);
    const [showInfo, setShowInfo] = useState(false)

    function handleSearchResult(result) {
        setSearchReasult(result)
        setIsSearchOpen(true)
    }

    function handleBookHover(book) {
        setHoveredBook(book);
        setShowInfo(true);
    }

    function handleBookUnhover() {
        setHoveredBook([])
        setShowInfo(false)
    }



    return (
        <Div_CatalogContainer
            className="custom-scrollbar"
        >
            <Div_BookListContainer>
                <SearchBar books={filteredBooks} onSearch={handleSearchResult}></SearchBar>
                <Div_BookList
                >
                    {filteredBooks.map((book, index) => (
                        <BookUnit
                            book={book}
                            key={index}
                            onMouseEnter={() => handleBookHover(book)}
                            onMouseLeave={() => handleBookUnhover([])}
                        />
                    ))}
                </Div_BookList>
            </Div_BookListContainer>

            <Div_FilterContainer>
                <div className={showInfo ? 'hidden' : ''}>
                    <BookFilter
                        onApplyFilters={applyFilters}
                        onClearFilters={clearFilters}
                    />
                </div>

                {showInfo && (
                    <p>{hoveredBook.description}</p>
                )}
            </Div_FilterContainer>

            {isSearchOpen && (
                <Div_ModalOverlay onClick={() => setIsSearchOpen(false)}>
                    <Div_BookListModal onClick={(e) => e.stopPropagation()}>
                        {searchResult.map((book, index) => (
                            <BookUnit book={book} key={index} />
                        ))}
                    </Div_BookListModal>
                </Div_ModalOverlay>
            )}
        </Div_CatalogContainer>
    );
}


const Div_CatalogContainer = styled.div`
    display: grid;
    grid-template-columns: 920px 333px;
    min-width: var(--container-width);
    background-color: var(--background-color-light);
    padding-left: 10%;
    gap: 20px;
    /* overflow: hidden; */
    overflow: auto;
    height: 100vh;
    padding-top: calc(var(--navbar-height) + 15px);



    @media (max-width: 1430px) {
        grid-template-columns: 870px 260px; 
        padding-left: 5%; 
    }
    @media (max-width: 1228px) {
        grid-template-columns: 760px 270px;  //this causing NavBar shrink ??
        grid-template-columns: 65% 25%; 
        padding-left: 5%; 
    }

    @media (max-width: 768px) {
        grid-template-columns: 620px 220px; 
        padding-left: 2%; 
        gap: 10px; 
    }

    @media (max-width: 480px) {
        grid-template-columns: 320px 160px; 
        padding-left: 1%; 
        gap: 5px; 
    }
`;

const Div_BookList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    max-width: 920px;
    background-color: var(--background-module-light);
    height:100;
    gap: 10px;
    padding: 10px;

    /* overflow: hidden; */

    
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); 
        gap: 5px;
        padding: 5px;
    }

    @media (max-width: 480px) {
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
        gap: 2px;
        padding: 2px;
    }
`;


const Div_BookListContainer = styled.div`
        display: flex;
        flex-direction: column; 
        /* overflow: auto; */
        height: 100vh;
        background-color: var(--background-module-light);

        @media (max-width: 1200px) {
        /* placeholder */
    }
    
`;

const Div_FilterContainer = styled.div`
    background-color: var(--background-module-light);
    border-radius: 5px;
    position: sticky;
    top: 0;

    height: 90vh;
    /* overflow-y: hidden; */
    overflow: auto;

    .hidden {
        display: none; 
    }

    @media (max-width: 1200px) {

    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
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
