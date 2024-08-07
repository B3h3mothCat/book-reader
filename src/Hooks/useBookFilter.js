import { useState, useEffect } from 'react';

export function useBookFilter(initialBooks) {
    const [books, setBooks] = useState(initialBooks);
    const [filteredBooks, setFilteredBooks] = useState(initialBooks);

    const applyFilters = (filters) => {
        const { genres, status, adultRating, minChapters, maxChapters } = filters;
        
        const filtered = books.filter((book) => {
            const { 
                genres: bookGenres,
                adultRating: bookAdultRating,
                titleStatus: bookStatus,
                } = book.filterInfo;

        const {chapters} = book;

            const matchGenres = genres.length === 0 || genres.every((genre) => bookGenres.includes(genre));
            const matchStatus = !status || bookStatus === status;
            const matchAdultRating = !adultRating || bookAdultRating === adultRating;

            // number 10 in parseInt - correctly converts value to decimal numbers
            const matchMinChapters = minChapters === '' || chapters.length >= parseInt(minChapters, 10);
            const matchMaxChapters = maxChapters === '' || chapters.length <= parseInt(maxChapters, 10);

            return matchGenres && matchStatus && matchAdultRating && matchMinChapters && matchMaxChapters;
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