import { useAuth } from "../context/AuthContext";
// import BookUnit from "./Book/BookUnit";
import useBooksData from "../Hooks/useBooksData";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";

import AccountBookUnit from "./Book/AccountBookUnit";

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
        <Div_AccContainer>
            <div className="personal-acc-bar">
                <div>Hello: {username}</div>
                <div>Your current role is: {userRole}</div>
                <button onClick={logout}>Logout</button>
            </div>

            {booksId.length > 0 && booksData.length > 0 && (
                <Div_BooksContainer>
                    {userBooks.map((book, index) => (

                        <Div_BookUnit key={index}>
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
                        </Div_BookUnit>
                    ))}
                </Div_BooksContainer>
            )}
        </Div_AccContainer>
    )
}

const Div_AccContainer = styled.div`
    width: 100vw;
`;

const Div_AccBar = styled.div`
    
`;

const Div_BooksContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
`;

const Div_BookUnit = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--background-module-light);
    margin-top: 5px;
    border-radius: 5px;
    transition: background-color 0.3s ease, box-shadow 0.25s ease;

    &:hover {
        box-shadow: 0 0 10px rgba(223, 221, 221, 0.479);  
    }

    img {
        height: 120px;
        width: 120px;
        margin-right: 30px; 
        object-fit: cover;
        border-radius: 50%;
        border: 1px grey solid;
        margin-left: 15px;
    }

    a {
        display: flex;
        align-items: center;
    }

    button {
        padding: 5px 10px;
        background-color: #ff4d4d;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 15px;

        &:hover {
            background-color: #ff7777;
        }
}

`;