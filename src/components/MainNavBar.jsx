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
            <div><Link to={'/'}>{t('mainNavBar.home')}</Link></div>
            <div><Link to={'/library'}>{t('mainNavBar.library')}</Link></div>
            {isLoggedIn && (
                <Link to={'/account'}>{t('mainNavBar.personalAccount')}</Link>
            )}
            {!isLoggedIn && (
                <Link to={'/Login'}>{t('mainNavBar.login')}</Link>
            )}
            <ThemeToggle />
            <LanguageSwitcher></LanguageSwitcher>
        </div>
    )
}