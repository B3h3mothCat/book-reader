import { useState } from "react"
import styled from "styled-components"
import searchIcon from "../../assets/img/search.svg"

export default function SearchBar({ books, onSearch }) {
    const [query, setQuery] = useState('')

    function handleInputChange(e) {
        setQuery(e.target.value)
    }

    function handleSearch() {
        if (query) {
            const result = books.filter((book) =>
                book.title.toLowerCase().includes(query.toLowerCase())
            )
            onSearch(result)
        } else {
            onSearch([])
            alert('There is no book with this title!')
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <Div_SearchBarContainer>
            <button onClick={handleSearch}>
                <img src={searchIcon} alt="Search" />
            </button>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search for a book..."
            />
        </Div_SearchBarContainer>
    )
}

const Div_SearchBarContainer = styled.div`
  height: 50px;
  background-color: var(--background-module-light);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
    display: flex;
    width: 100%;


  input {
    margin-top: 1%;
    width: 93%;
    height: 30px;
    background-color: var(--background-module-light);
    border-radius: 5px;
    border: 1px solid grey;
    outline: none;
    color: var(--primary-text-color-light);
    padding: 1%;

    &:focus {
      border-color: var(--focus-color-light);
    }
  }

  button {
    margin-top: 1%;
    height: 30px;
    border-radius: 7px;
    background-color: gray;
    border: 1px solid grey;
    width: 30px;
  }
`