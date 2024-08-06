import { useState } from "react";
import { useTranslation } from "react-i18next";

const genres = ['Comedy', 'Romance', 'Drama', 'Fantasy', 'Adventure', 'Cruelty'];
const statuses = ['Ongoing', 'Completed', 'Hiatus'];
const adultRatings = ['', '16+', '18+'];

export default function BookFilter({ onApplyFilters, onClearFilters }) {

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedAdultRating, setSelectedAdultRating] = useState('');
    const [minChapters, setMinChapters] = useState('');
    const [maxChapters, setMaxChapters] = useState('');

    const { t } = useTranslation();

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
                <h3>{t('bookFilterGenres.title')}</h3>
                {genres.map((genre) => (
                    <label key={genre} className="checkbox-item">
                        <input
                            type="checkbox"
                            id={`genre-${genre}`}
                            checked={selectedGenres.includes(genre)}
                            onChange={() => handleGenreChange(genre)}
                        />
                        <label htmlFor={`genre-${genre}`}>{t(`bookFilterGenres.${genre.toLowerCase()}`)}</label>
                    </label>
                ))}
            </div>
            <div className="filter-section">
                <h3>{t('bookFilterStatus.title')}</h3>
                {statuses.map((status) => (
                    <label key={status} className="checkbox-item">
                        <input
                            type="radio"
                            id={`status-${status}`}
                            name="status"
                            checked={selectedStatus === status}
                            onChange={() => handleStatusChange(status)}
                        />
                        <label htmlFor={`status-${status}`}>{t(`bookFilterStatus.${status.toLowerCase()}`)}</label>
                    </label>
                ))}
            </div>
            <div className="filter-section">
                <h3>{t('bookFilterRating.title')}</h3>
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
            <div className="filter-section">
                <h3>{t('bookFilter.numOfChapters')}</h3>
                <div className="input-section">

                    <input
                        className="filter-input"
                        type="number"
                        value={minChapters}
                        onChange={handleMinChaptersChange}
                        placeholder={t('bookFilter.placeholderMin')}
                    />

                    <input
                        className="filter-input"
                        type="number"
                        value={maxChapters}
                        onChange={handleMaxChaptersChange}
                        placeholder={t('bookFilter.placeholderMax')}
                    />
                </div>
            </div>

            <div className="filter-btn-container">
                <button onClick={handleClear}>{t('bookFilter.clearAll')}</button>
                <button onClick={handleApply}>{t('bookFilter.apply')}</button>
            </div>

        </div>
    )
}