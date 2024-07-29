import { useAuth } from "../Context/AuthContext"


export default function MainPage() {
    const { userRole } = useAuth()

    return (

        <div className="home-page">
            <h3>MAIN PAGE</h3>
            <span>Lorem?</span>
            <br />
            <span>Current user role is: {userRole}</span>
        </div>

    )
}