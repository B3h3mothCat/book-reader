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

            <div className="boookfrontpage-container">
                <div className="book-banner"> cover of book
                    <img src={book.banner} alt={'banner-tile'} />
                </div>

                <button onClick={handleStartReading}>{t('bookFrontPage.startReading')}</button>

                {isLoggedIn && (
                    <button onClick={handleAddToPersonalList}>{t('bookFrontPage.addBook')}</button>
                )}

                <div className="">Navbar for book tabs
                    <div>
                        <button onClick={() => setActiveTab('description')}>
                            {t('bookFrontPage.description')}
                        </button>
                        <button onClick={() => setActiveTab('list')}>
                            {t('bookFrontPage.list')}
                        </button>
                    </div>
                </div>

                <div className="tab-container">
                    {activeTab === 'description' && (
                        <>
                            <h3>{title}</h3>
                            <p>{t('bookFrontPage.genres')}{book.filterInfo.genres.join(', ')}</p>
                            <p>{t('bookFrontPage.status')}{book.filterInfo.titleStatus}</p>
                            <p>{t('bookFrontPage.rating')}{book.filterInfo.adultRating}</p>
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