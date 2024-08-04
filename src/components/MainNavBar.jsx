import { Link } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import ThemeToggle from "./UI/ThemeToggle"

export default function MainNavBar() {
    const { isLoggedIn, username } = useAuth()

    return (
        <div className="main-navbar-container">
            <div><Link to={'/'}>Home</Link></div>
            <div><Link to={'/library'}>Library</Link></div>
            {isLoggedIn && (
                <Link to={'/account'}>Personal account</Link>
            )}
            {!isLoggedIn && (
                <Link to={'/Login'}>Login</Link>
            )}
            <ThemeToggle />
        </div>
    )
}