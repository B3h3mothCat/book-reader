import { useState, useEffect } from 'react';
import Select from 'react-select';


const options = [
    { value: 'inPlans', label: 'In Plans to Read' },
    { value: 'reading', label: 'Reading' },

];

export default function BookDropdown({ onAddToPersonalList, isBookListed, book, onMoveBook }) {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    useEffect(() => {
        const defaultOption = options.find(option => option.value === isBookListed);
        setSelectedOption(defaultOption || options[0]);
    }, [isBookListed]);

    const handleChange = (option) => {
        setSelectedOption(option);
    };


    const handleAction = () => {
        if (selectedOption) {
            if (isBookListed) {
                onMoveBook(book, selectedOption.value);
            } else {
                onAddToPersonalList(selectedOption.value);
            }
            // Clear selection if needed
            setSelectedOption(null);
        }
    };

    return (
        <>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                placeholder="Select a group"
            />
            <button onClick={handleAction}>
                {isBookListed ? 'Move Book' : 'Add Book'}
            </button>
        </>
    );
}
