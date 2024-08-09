import { useAuth } from "../Context/AuthContext";
import MainNavBar from "./MainNavBar";
import BookUnit from "./Book/BookUnit";

export default function PersonalAccount() {
    const { username, userRole, logout, books, delBookFromUser } = useAuth()


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
                        <div>Here we can place UI for added books</div>
                        {books.map((book, index) => (
                            <div className="account-book" key={index}>
                                <BookUnit book={book} key={index} />
                                <button onClick={() => delBookFromUser(book)}>Del book</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

// After user log out - there should be no books