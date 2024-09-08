import styled from 'styled-components'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookToUser, delBookFromUser, moveBook, updateUserBooks } from "../store/bookSlice";
import useAuthStorage from '../features/Authentication/useAuthStorage';

export default function MockPage() {
    const dispatch = useDispatch();

    // Access currentUser from the AuthProvider context
    const { currentUser } = useAuthStorage();

    useEffect(() => {
        if (currentUser) {
            // Optionally, load books from the backend here
        }
    }, [currentUser]);

    const handleAddBook = (book, group) => {
        if (currentUser) {
            // Dispatch Redux action to add book locally
            dispatch(addBookToUser({ book, group }));

            // Optionally, update the user's books on the server
            dispatch(updateUserBooks({ currentUser, updatedBookCollections: [...bookCollections, { id: book.id, group, bookmarks: [] }] }));
        }
    };

    const handleDeleteBook = (book) => {
        if (currentUser) {
            // Dispatch Redux action to delete book locally
            dispatch(delBookFromUser(book));

            // Optionally, update the user's books on the server
            dispatch(updateUserBooks({ currentUser, updatedBookCollections: bookCollections.filter(b => b.id !== book.id) }));
        }
    };

    const handleMoveBook = (book, newGroup) => {
        if (currentUser) {
            // Dispatch Redux action to move book locally
            dispatch(moveBook({ book, newGroup }));

            // Optionally, update the user's books on the server
            dispatch(updateUserBooks({
                currentUser,
                updatedBookCollections: bookCollections.map(b =>
                    b.id === book.id ? { ...b, group: newGroup } : b
                )
            }));
        }
    };

    return (
        <Div_Container>
            <h1>Book Manager</h1>

        </Div_Container>
    )
}


const Div_Container = styled.div`
    padding-top: calc(var(--navbar-height) + 15px);
    background-color: var(--background-color);
    width: 100vw;
`;