import List from "../components/Book/List"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react";
import MainNavBar from "../components/MainNavBar";

import { useAuth } from "../Context/AuthContext";

import { useTranslation } from "react-i18next";

export default function BookFrontPage() {
    const { chapters, title, description, book } = useLocation().state;
    const [activeTab, setActiveTab] = useState('description')
    const navigate = useNavigate()
    const { t } = useTranslation()

    const { addBookToUser, isLoggedIn } = useAuth()

    const handleStartReading = () => {
        navigate(`/chapter/${encodeURIComponent(chapters[0].content)}`, {
            state: {
                currentChapterIndex: 0,
                chapters: chapters,
                title: title,
            }
        });
    };

    const handleAddToPersonalList = () => {
        addBookToUser(book)
        // add some indication if done
    };

    return (
        <>
            <MainNavBar></MainNavBar>

            <div>
                <div className="book-banner">
                    <img src={book.banner} alt={'banner-tile'} />
                </div>
                <div>cover of book</div>

                <button onClick={handleStartReading}>Start reading now!</button>

                {isLoggedIn && (
                    <button onClick={handleAddToPersonalList}>Add book to personal list</button>
                )}

                <div className="">Navbar for book tabs
                    <div>
                        <button onClick={() => setActiveTab('description')}>
                            Description
                        </button>
                        <button onClick={() => setActiveTab('list')}>
                            List
                        </button>
                    </div>
                </div>

                <div className="tab-container">
                    {activeTab === 'description' && (
                        <>
                            <h3>{title}</h3>
                            <p>Genres: {book.filterInfo.genres.join(', ')}</p>
                            <p>Status: {book.filterInfo.titleStatus}</p>
                            <p>Adult Rating: {book.filterInfo.adultRating}</p>
                            <div className="desription-tab">
                                <p>{description}</p>
                            </div>
                        </>

                    )}

                    {activeTab === 'list' && (
                        <List
                            chapters={chapters}
                            title={title}
                        />
                    )}
                </div>
            </div>
        </>
    )
}