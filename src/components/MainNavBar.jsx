import { Link } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"

export default function MainNavBar() {
    const { isLoggedIn } = useAuth()

    return (
        <div className="main-navbar-container">
            <div><Link to={'/'}>Home</Link></div>
            <div><Link to={'/library'}>Library</Link></div>
            {isLoggedIn && (
                <div>User is autorized</div>
            )}
            {!isLoggedIn && (
                <Link to={'/Login'}>Login</Link>
            )}
        </div>
    )
}