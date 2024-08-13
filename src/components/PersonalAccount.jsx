import { useAuth } from "../Context/AuthContext";
import MainNavBar from "./MainNavBar";
import BookUnit from "./Book/BookUnit";
import useBooksData from "../Hooks/useBooksData";
import { useState, useEffect, useRef } from "react";

// static book source:
// import { BOOKS_DATA_RU } from "../mock/data_ru"

// for static rendering (but for api we need useEffect): 
// const userBooks = BOOKS_DATA_RU.filter(book => booksId.includes(book.id))

export default function PersonalAccount() {
    const { username, userRole, isLoggedIn, logout, delBookFromUser, booksId = [] } = useAuth()
    const { booksData = [] } = useBooksData()


    const [userBooks, setUserBooks] = useState([]);

    // avoiding infinite loop of re-renders with ref
    const isLoggedInRef = useRef(isLoggedIn);

    useEffect(() => {
        isLoggedInRef.current = isLoggedIn; // update the ref on auth state change
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedInRef.current) {
            if (booksData.length > 0) {
                const accountBooks = booksData.filter(book => booksId.includes(book.id));
                setUserBooks(accountBooks);
            } else {
                setUserBooks([]);
            }
        } else {
            if (userBooks.length > 0) {
                setUserBooks([]);
            }
        }
    }, [booksId, booksData]);


    return (
        <>
            <MainNavBar></MainNavBar>
            <div className="personal-acc-container">
                <div className="personal-acc-bar">
                    <div>Hello: {username}</div>
                    <div>Your current role is: {userRole}</div>
                    <button onClick={logout}>Logout</button>
                </div>

                {booksId.length > 0 && booksData.length > 0 && (
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
