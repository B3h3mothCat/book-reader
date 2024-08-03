import { useState } from "react"

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
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search for a book..."
            />
            <button onClick={handleSearch}>Find it!</button>
        </div>
    )
}