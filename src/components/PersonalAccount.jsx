import { useAuth } from "../Context/AuthContext";
import MainNavBar from "./MainNavBar";
import BookUnit from "./Book/BookUnit";

import { BOOKS_DATA_RU } from "../mock/data_ru"

export default function PersonalAccount() {
    const { username, userRole, logout, delBookFromUser, booksId = [] } = useAuth()

    const userBooks = BOOKS_DATA_RU.filter(book => booksId.includes(book.id))

    return (
        <>
            <MainNavBar></MainNavBar>
            <div className="personal-acc-container">
                <div className="personal-acc-bar">
                    <div>Hello: {username}</div>
                    <div>Your current role is: {userRole}</div>
                    <button onClick={logout}>Logout</button>
                </div>

                {booksId && (
                    <div className="added-books">
                        <div>Now we using id instead of entire book</div>
                        {userBooks.map((book, index) => (
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