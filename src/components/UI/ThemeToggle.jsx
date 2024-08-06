import './ThemeToggle.css'
import { useTheme } from '../../Hooks/useTheme'
import { useTranslation } from 'react-i18next'

export default function ThemeToggle() {

    const [isDark, setIsDark] = useTheme()
    const { t } = useTranslation()

    return (
        <div className="toggle-container">
            <button
                onClick={() => setIsDark(!isDark)}
                className="theme-toggle-button">
                {isDark ? t('themeToggle.light') : t('themeToggle.dark')}
            </button>
        </div>
    )
}

