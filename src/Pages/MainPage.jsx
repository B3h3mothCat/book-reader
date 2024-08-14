import { useAuth } from "../Context/AuthContext"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";
import MainNavBar from "../components/MainNavBar";
import DevNews from "../components/Temp/DevNews";

import useModal from "../Hooks/useModal";

export default function MainPage() {

    const { userRole } = useAuth()
    const { t } = useTranslation()

    const { isModalOpen, openModal, modalRef } = useModal(false)

    return (
        <>
            <MainNavBar />
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


            {/* <button onClick={openModal}>OPEN IN</button>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="mainpage-dashboard" ref={modalRef}>
                        <DevNews ></DevNews>
                    </div>
                </div>
            )} */}
        </>
    )
}