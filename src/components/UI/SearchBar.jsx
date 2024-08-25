import { useState } from "react"
import styled from "styled-components"

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
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search for a book..."
            />
            <button onClick={handleSearch}>Find it!</button>
        </Div_SearchBarContainer>
    )
}

const Div_SearchBarContainer = styled.div`
  height: 50px;

  input {
    margin-top: 1%;
    width: 50%;
    height: 30px;
    background-color: var(--background-module-light);
    border-radius: 5px;
    border: 1px solid grey;
    outline: none;
    color: var(--primary-text-color-light);
    padding: 1%;

    &:focus {
      border-color: rgb(198, 198, 216);
    }
  }

  button {
    padding: 5px;
    margin-left: 4px;
    border-radius: 7px;
    border: none;
    background-color: #6fb2fa;
  }
`