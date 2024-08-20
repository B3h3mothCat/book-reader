import { useState } from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components";

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
        <Div_Container>
            <Div_Section>
                <h3>{t('bookFilterGenres.title')}</h3>
                {genres.map((genre) => (
                    <Label_CheckboxItem key={genre}>
                        <input
                            type="checkbox"
                            id={`genre-${genre}`}
                            checked={selectedGenres.includes(genre)}
                            onChange={() => handleGenreChange(genre)}
                        />
                        <label htmlFor={`genre-${genre}`}>{t(`bookFilterGenres.${genre.toLowerCase()}`)}</label>
                    </Label_CheckboxItem>
                ))}
            </Div_Section>
            <Div_Section>
                <h3>{t('bookFilterStatus.title')}</h3>
                {statuses.map((status) => (
                    <Label_CheckboxItem key={status}>
                        <input
                            type="radio"
                            id={`status-${status}`}
                            name="status"
                            checked={selectedStatus === status}
                            onChange={() => handleStatusChange(status)}
                        />
                        <label htmlFor={`status-${status}`}>{t(`bookFilterStatus.${status.toLowerCase()}`)}</label>
                    </Label_CheckboxItem>
                ))}
            </Div_Section>
            <Div_Section>
                <h3>{t('bookFilterRating.title')}</h3>
                {adultRatings.map((rating) => (
                    <Label_CheckboxItem key={rating}>
                        <input
                            type="radio"
                            id={`rating=${rating}`}
                            name="adultRating"
                            checked={selectedAdultRating === rating}
                            onChange={() => handleAdultRatingChange(rating)}
                        />
                        <label htmlFor={`rating=${rating}`}>{rating}</label>
                    </Label_CheckboxItem>
                ))}
            </Div_Section>
            <Div_Section>
                <h3>{t('bookFilter.numOfChapters')}</h3>
                <Div_InputGroup>
                    <Input_Field
                        type="number"
                        value={minChapters}
                        onChange={handleMinChaptersChange}
                        placeholder={t('bookFilter.placeholderMin')}
                    />

                    <Input_Field
                        type="number"
                        value={maxChapters}
                        onChange={handleMaxChaptersChange}
                        placeholder={t('bookFilter.placeholderMax')}
                    />
                </Div_InputGroup>
            </Div_Section>

            <Div_ButtonGroup>
                <button onClick={handleApply}>{t('bookFilter.apply')}</button>
                <button onClick={handleClear}>{t('bookFilter.clearAll')}</button>
            </Div_ButtonGroup>
        </Div_Container>
    )
}

// Styled Components

const Div_Container = styled.div`
  width: 20%;
  background-color: var(--background-module-light);
  border-radius: 5px;
`;

const Div_Section = styled.div`
  border-bottom: 1px gray solid;
  padding: 10%;
`;

const Div_InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const Input_Field = styled.input`
  outline: none;
  width: 80px;
`;

const Div_ButtonGroup = styled.div`
  padding-top: 5%;
  display: flex;
  justify-content: center;
  gap: 5px;
  place-items: center;

  button {
    border-radius: 3px;
    border: 1px solid transparent;
    padding: 0.2em 0.6em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
  }
`;

const Label_CheckboxItem = styled.label`
  display: flex;
  gap: 5px;

  input, label {
    cursor: pointer;
  }
`;