import './ThemeToggle.css'
import { useTheme } from '../../Hooks/useTheme'

export default function ThemeToggle() {

    const [isDark, setIsDark] = useTheme()

    return (
        <div className="toggle-container">
            <button
                onClick={() => setIsDark(!isDark)}
                className="theme-toggle-button">
                {isDark ? 'Light Theme' : 'Dark Theme'}
            </button>
        </div>
    )
}

