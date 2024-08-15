import { useAuth } from "../Context/AuthContext"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";
import MainNavBar from "../components/MainNavBar";
import DevNews from "../components/Temp/DevNews";

import { useState } from "react";

import ModalWrapper from "../components/UI/ModalWrapper";

export default function MainPage() {

    const { userRole } = useAuth()
    const { t } = useTranslation()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <MainNavBar openModal={openModal} />
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

            {/* <div>
                <button onClick={openModal}>Open Modal</button>
                <ModalWrapper isOpen={isModalOpen} onClose={closeModal}>
                    <div className="mainpage-dashboard">
                        <DevNews></DevNews>
                    </div>
                </ModalWrapper>
            </div> */}

        </>
    )
}