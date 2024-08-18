import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";
import DevNews from "../components/Temp/DevNews";

import { useState } from "react";


export default function MainPage() {

    const { userRole } = useAuth()
    const { t } = useTranslation()


    return (
        <>
            <nav>
                <ul>
                    <li><Link to={'/read-file'}>{t('mainPage.readFile')}</Link></li>
                </ul>
            </nav>

            <div className="home-page">
                <h3>{t('mainPage.mainPage')}</h3>
                <span>{t('mainPage.currentRole')}{userRole}</span>
            </div>
            <div className="mainpage-dashboard">
                <DevNews></DevNews>
            </div>

        </>
    )
}