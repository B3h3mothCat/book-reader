import { Link } from "react-router-dom"
import { useAuth } from "../features/Authentication/AuthContext"
import ThemeToggle from "./ui/ThemeToggle"
import LanguageSwitcher from "./LanguageSwitcher"
import { useTranslation } from "react-i18next";
import styled from "styled-components"


export default function MainNavBar() {
  const { isLoggedIn } = useAuth()
  const { t } = useTranslation()

  return (
    <Div_Container>
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
    </Div_Container>
  )
}

const Div_Container = styled.div`
  border-bottom: 2px gray solid;
  height: var(--navbar-height);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--background-module-light);
  z-index: 11;
  flex-wrap: wrap;

  position: fixed;

  a {
    height: 100%;
    display: flex;
    align-items: center;
    width: 120px;
    text-decoration: inherit;
    color: var(--primary-text-color-light);

        &:hover {
        color: var(--focus-color-light)
        }

  }
`;

const StyledLink = styled(Link)` // this is example of possible option
  text-decoration: none;
  color: var(--primary-text-color-light);
  padding: 0.5em 1em;
  border-radius: 5px;

  &:hover {
    color: #f71f79;
    background-color: var(--background-module-dark);
  }
`;