import { useAuth } from "../features/Authentication/AuthContext"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";
import DevNews from "../components/Temp/DevNews";

import { useState, useEffect } from "react";
import styled from "styled-components";
import LoaderScreen from "../components/ui/LoadingScreen";

{/* toolkit example */ }
import Counter from "../components/Temp/Counter";

export default function MainPage() {

    const { userRole } = useAuth()
    const { t } = useTranslation()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500);
    }, [])

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
                {isLoading ? (
                    <LoaderScreen message={'hello cutie!'} />
                ) : (
                    <DevNews></DevNews>
                )}
            </Div_Dashboard>

            {/* toolkit example */}
            <Counter></Counter>
        </>
    )
}

const Div_HomePage = styled.div`
    padding-top: calc(var(--navbar-height) + 15px);
    background-color: var(--background-color);
    width: 100vw;
`;
const Div_Dashboard = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
`;