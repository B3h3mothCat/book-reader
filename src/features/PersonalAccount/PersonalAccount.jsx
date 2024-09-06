import { usePersonalAccount } from "./usePersonalAccount"
import styled from "styled-components"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStorage from '../Authentication/useAuthStorage'

import { ENDPOINTS } from '../../utils/apiEndpoints'

export default function PersonalAccount() {

    const {
        username,
        userRole,
        logout,
        delBookFromUser,
        userBooks,
        sortOption,
        setSortOption
    } = usePersonalAccount()

    const navigate = useNavigate()

    const { currentUser } = useAuthStorage();
    const [userBookCollections, setUserBookCollections] = useState([]);


    // useEffect(() => {
    //     console.log(currentUser.id);
    // }, [currentUser])

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <Div_AccContainer>
            <div className="personal-acc-bar">
                <div>Hello: {username}</div>
                <div>Your current role is: {userRole}</div>
                <button onClick={handleLogout}>Logout</button>
            </div>

            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="all">All Books</option>
                <option value="reading">Reading</option>
                <option value="inPlans">In Plans</option>
            </select>

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
        </Div_AccContainer>
    )
}

const Div_AccContainer = styled.div`
    width: 100vw;
    padding-top: calc(var(--navbar-height) + 15px);
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