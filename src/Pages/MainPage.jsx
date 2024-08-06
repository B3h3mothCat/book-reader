import { useAuth } from "../Context/AuthContext"
import { Link } from "react-router-dom"
import MainNavBar from "../components/MainNavBar";

import { useTranslation } from "react-i18next";

export default function MainPage() {

    const { userRole } = useAuth()
    const { t } = useTranslation()


    return (
        <>
            <MainNavBar />
            <nav>
                <ul>
                    {/* <li><Link to={'/'}>Main Page</Link></li>
                    <li><Link to={'/login'}>Login page</Link></li> */}
                    <li><Link to={'/read-file'}>{t('mainPage.readFile')}</Link></li>
                    <br />
                    {/* Book folder routes */}
                    {/* <li><Link to={'/library'}>LIBRARY</Link></li> */}
                    {/* Book folder routes */}
                </ul>
            </nav>

            <div className="home-page">
                <h3>{t('mainPage.mainPage')}</h3>
                <br />
                <span>{t('mainPage.currentRole')}{userRole}</span>
            </div>
        </>
    )
}