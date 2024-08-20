import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";
import DevNews from "../components/Temp/DevNews";

import { useState } from "react";
import styled from "styled-components";

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

            <Div_HomePage>
                <h3>{t('mainPage.mainPage')}</h3>
                <span>{t('mainPage.currentRole')}{userRole}</span>
            </Div_HomePage>

            <Div_Dashboard>
                <DevNews></DevNews>
            </Div_Dashboard>
        </>
    )
}

const Div_HomePage = styled.div`
background-color: var(--background-color);
`;
const Div_Dashboard = styled.div`
width: 100%;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
margin-top: 15px;
`;