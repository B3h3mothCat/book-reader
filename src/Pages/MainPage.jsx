import { useAuth } from "../Context/AuthContext"
import { Link } from "react-router-dom"

export default function MainPage() {
    const { userRole } = useAuth()

    return (
        <>
            <nav>
                <ul>
                    <li><Link to={'/'}>Main Page</Link></li>
                    <li><Link to={'/login'}>Login page</Link></li>
                    <li><Link to={'/read-file'}>Read File</Link></li>
                    <br />
                    {/* Book folder routes */}
                    <li><Link to={'/library'}>LIBRARY</Link></li>
                    {/* Book folder routes */}
                </ul>
            </nav>

            <div className="home-page">
                <h3>MAIN PAGE</h3>
                <span>Lorem?</span>
                <br />
                <span>Current user role is: {userRole}</span>
            </div>
        </>
    )
}