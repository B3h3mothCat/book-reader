import { useState } from 'react';

export function useBookFilter(initialBooks) {
    const [books, setBooks] = useState(initialBooks);
    const [filteredBooks, setFilteredBooks] = useState(initialBooks);

    const applyFilters = (filters) => {
        const { genres, status, adultRating } = filters;
        const filtered = books.filter((book) => {
            const { genres: bookGenres, adultRating: bookAdultRating, titleStatus: bookStatus } = book.filterInfo;

            const matchGenres = genres.length === 0 || genres.every((genre) => bookGenres.includes(genre));
            const matchStatus = !status || bookStatus === status;
            const matchAdultRating = !adultRating || bookAdultRating === adultRating;

            return matchGenres && matchStatus && matchAdultRating;
        });
        setFilteredBooks(filtered);
    };

    const clearFilters = () => {
        setFilteredBooks(books);
    };

    return {
        filteredBooks,
        applyFilters,
        clearFilters,
    };
}