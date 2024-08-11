import { useAuth } from "../Context/AuthContext";
import MainNavBar from "./MainNavBar";
import { Link } from "react-router-dom";

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
                            <div className="" key={index}>
                                <div className='acc-book-unit'>
                                    <Link
                                        to={`/book-front/${encodeURIComponent(book.title)}`}
                                        state={{
                                            chapters: book.chapters,
                                            title: book.title,
                                            description: book.description,
                                            book: book,
                                        }}
                                    >
                                        <img src={book.picture} alt={book.title} />
                                        {book.title}
                                    </Link>
                                    <button onClick={() => delBookFromUser(book)}>Del book</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    )
}

// After user log out - there should be no books