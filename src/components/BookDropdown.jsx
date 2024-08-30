import { useState } from 'react';
import Select from 'react-select';

// Define options for the dropdown
const options = [
    { value: 'reading', label: 'Reading' },
    { value: 'inPlans', label: 'In Plans to Read' },
    // Add more options as needed
];

export default function BookDropdown({ onAddToPersonalList }) {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    // here we should add actual state

    const handleChange = (option) => {
        setSelectedOption(option);
    };

    const handleAddBook = () => {
        if (selectedOption) {
            onAddToPersonalList(selectedOption.value);
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
            <button onClick={handleAddBook}>Add Book</button>
        </>
    );
}
