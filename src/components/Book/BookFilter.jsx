import { useState } from "react";

const genres = ['Comedy', 'Romance', 'Drama', 'Fantasy', 'Adventure', 'Cruelty'];
const statuses = ['Ongoing', 'Completed', 'Hiatus'];
const adultRatings = ['', '16+', '18+'];

export default function BookFilter({ onApplyFilters, onClearFilters }) {

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedAdultRating, setSelectedAdultRating] = useState('');
    const [minChapters, setMinChapters] = useState('');
    const [maxChapters, setMaxChapters] = useState('');

    const handleGenreChange = (genre) => {
        setSelectedGenres((prev =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        ))
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };

    const handleAdultRatingChange = (rating) => {
        setSelectedAdultRating(rating);
    };

    const handleMinChaptersChange = (e) => {
        setMinChapters(e.target.value);
    };

    const handleMaxChaptersChange = (e) => {
        setMaxChapters(e.target.value);
    };

    const handleApply = () => {
        onApplyFilters({
            genres: selectedGenres,
            status: selectedStatus,
            adultRating: selectedAdultRating,
            minChapters,
            maxChapters
        })
    }

    const handleClear = () => {
        setSelectedGenres([]);
        setSelectedStatus('');
        setSelectedAdultRating('');
        setMinChapters('');
        setMaxChapters('');
        onClearFilters();
    }

    return (
        <div className="book-filter">

            <div className="filter-section">
                <h3>Number of Chapters</h3>
                <div className="input-section">

                    <input
                        className="filter-input"
                        type="number"
                        value={minChapters}
                        onChange={handleMinChaptersChange}
                        placeholder="min"
                    />

                    <input
                        className="filter-input"
                        type="number"
                        value={maxChapters}
                        onChange={handleMaxChaptersChange}
                        placeholder="max"
                    />
                </div>
            </div>

            <div className="filter-section">
                <h3>Genres</h3>
                {genres.map((genre) => (
                    <label key={genre} className="checkbox-item">
                        <input
                            type="checkbox"
                            id={`genre-${genre}`}
                            checked={selectedGenres.includes(genre)}
                            onChange={() => handleGenreChange(genre)}
                        />
                        <label htmlFor={`genre-${genre}`}>{genre}</label>
                    </label>
                ))}
            </div>
            <div className="filter-section">
                <h3>Status</h3>
                {statuses.map((status) => (
                    <label key={status} className="checkbox-item">
                        <input
                            type="radio"
                            id={`status-${status}`}
                            name="status"
                            checked={selectedStatus === status}
                            onChange={() => handleStatusChange(status)}
                        />
                        <label htmlFor={`status-${status}`}>{status}</label>
                    </label>
                ))}
            </div>
            <div className="filter-section">
                <h3>Adult Rating</h3>
                {adultRatings.map((rating) => (
                    <label key={rating} className="checkbox-item">
                        <input
                            type="radio"
                            id={`rating=${rating}`}
                            name="adultRating"
                            checked={selectedAdultRating === rating}
                            onChange={() => handleAdultRatingChange(rating)}
                        />
                        <label htmlFor={`rating=${rating}`}>{rating}</label>
                    </label>
                ))}
            </div>
            <div className="filter-btn-container">
                <button onClick={handleClear}>Clear All</button>
                <button onClick={handleApply}>Apply</button>
            </div>

        </div>
    )
}