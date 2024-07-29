import { Outlet, Link } from "react-router-dom"

export default function NavBar() {
    return (
        <>
            <nav>
                <Link to={'/'} className="logo-nav">Main Option_1st</Link>
                <div className="link-count">
                    <Link to={'/'}>Main Option_2nd</Link>
                    <Link to={'library'}>Library</Link>
                </div>
                <Outlet />
            </nav>
        </>
    )
}