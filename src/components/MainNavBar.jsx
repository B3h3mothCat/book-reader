import { Link } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import ThemeToggle from "./UI/ThemeToggle"
import LanguageSwitcher from "./LanguageSwitcher"

import { useTranslation } from "react-i18next";


export default function MainNavBar() {
    const { isLoggedIn } = useAuth()
    const { t } = useTranslation()

    return (
        <div className="main-navbar-container">
            <Link className="nav-link" to={'/'}>{t('mainNavBar.home')}</Link>
            <Link className="nav-link" to={'/library'}>{t('mainNavBar.library')}</Link>
            {isLoggedIn && (
                <Link className="nav-link" to={'/account'}>{t('mainNavBar.personalAccount')}</Link>
            )}
            {!isLoggedIn && (
                <Link className="nav-link" to={'/Login'}>{t('mainNavBar.login')}</Link>
            )}
            <LanguageSwitcher></LanguageSwitcher>
            <ThemeToggle />
        </div>
    )
}