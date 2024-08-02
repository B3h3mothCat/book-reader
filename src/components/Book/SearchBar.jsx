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
    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for a book..."
            />
            <button onClick={handleSearch}>Find it!</button>
        </div>
    )
}