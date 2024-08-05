import { useState } from "react";

const genres = ['Comedy', 'Romance', 'Drama', 'Fantasy', 'Adventure', 'Cruelty'];
const statuses = ['Ongoing', 'Completed', 'Hiatus'];
const adultRatings = ['', '16+', '18+'];

export default function BookFilter({ onApplyFilters, onClearFilters }) {

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedAdultRating, setSelectedAdultRating] = useState('');

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

    const handleApply = () => {
        onApplyFilters({ genres: selectedGenres, status: selectedStatus, adultRating: selectedAdultRating })
    }

    const handleClear = () => {
        setSelectedGenres([]);
        setSelectedStatus('');
        setSelectedAdultRating('');
        onClearFilters();
    }

    return (
        <div className="book-filter">
            <div>
                <h3>Genres</h3>
                {genres.map((genre) => (
                    <div key={genre}>
                        <input
                            type="checkbox"
                            checked={selectedGenres.includes(genre)}
                            onChange={() => handleGenreChange(genre)}
                        />
                        <label>{genre}</label>
                    </div>
                ))}
            </div>
            <div>
                <h3>Status</h3>
                {statuses.map((status) => (
                    <div key={status}>
                        <input
                            type="radio"
                            name="status"
                            checked={selectedStatus === status}
                            onChange={() => handleStatusChange(status)}
                        />
                        <label>{status}</label>
                    </div>
                ))}
            </div>
            <div>
                <h3>Adult Rating</h3>
                {adultRatings.map((rating) => (
                    <div key={rating}>
                        <input
                            type="radio"
                            name="adultRating"
                            checked={selectedAdultRating === rating}
                            onChange={() => handleAdultRatingChange(rating)}
                        />
                        <label>{rating}</label>
                    </div>
                ))}
            </div>
            <button onClick={handleApply}>Apply</button>
            <button onClick={handleClear}>Clear All</button>
        </div>
    )
}