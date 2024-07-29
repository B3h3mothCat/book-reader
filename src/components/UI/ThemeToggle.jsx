import './ThemeToggle.css'

export default function Toggletheme({ handleChange, isChecked }) {
    return (
        <div className="toggle-container">
            <input
                type="checkbox"
                id="check"
                className="toggle"
                onChange={handleChange}
                checked={isChecked}
            />
            <label htmlFor="check">Dark mode</label>
        </div>
    )
}