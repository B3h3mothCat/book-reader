import { useAuth } from "../Context/AuthContext";
import MainNavBar from "./MainNavBar";
import { Link } from "react-router-dom";
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
                    <div className="added-books-container">
                        {userBooks.map((book, index) => (
                            <div className="acc-book-unit-b" key={index}>
                                <BookUnit book={book} specialCss={'acc-book-unit'} />
                                <button onClick={() => delBookFromUser(book)}>Del book</button>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    )
}
