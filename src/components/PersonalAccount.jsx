import { useAuth } from "../Context/AuthContext";
import MainNavBar from "./MainNavBar";
import BookUnit from "./Book/BookUnit";

export default function PersonalAccount() {
    const { username, userRole, logout, books } = useAuth()

    return (
        <>
            <MainNavBar></MainNavBar>
            <div className="personal-acc-container">
                <div className="personal-acc-bar">
                    <div>Hello: {username}</div>
                    <div>Your current role is: {userRole}</div>
                    <button onClick={logout}>Logout</button>
                </div>

                {books && (
                    <div className="added-books">
                        Here we can place list of added books
                        {books.map((book, index) => (
                            <BookUnit book={book} key={index} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

// After user log out - there should be no books