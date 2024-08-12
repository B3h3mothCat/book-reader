import { useState, useEffect } from 'react';

async function fecthBooksData() {
    const res = await fetch('http://localhost:5000/books')
    const data = await res.json()
    return data
}

function useBooksData() {
    const [booksData, setBooksData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadBooks() {
            try {
                const data = await fecthBooksData()
                setBooksData(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadBooks()
    }, [])
    return {booksData, loading, error}
}

export default useBooksData