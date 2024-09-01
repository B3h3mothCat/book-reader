import List from "../components/Book/List"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useAuth } from "../features/Authentication/AuthContext";
import { useTranslation } from "react-i18next";
import styled from "styled-components"
import BookDropdown from "../components/BookDropdown";

import BookUnit from '../components/Book/BookUnit'

export default function BookFrontPage() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const { chapters, title, description, book, similarBooks } = useLocation().state;
    const [activeTab, setActiveTab] = useState('description')
    const { addBookToUser,
        isLoggedIn,
        bookCollections,
        moveBook,
        currentUser,  // can use it to make more robust code <==
    } = useAuth()

    const [isBookListed, setIsBookListed] = useState('')
    const [similarBooksState, setSimilarBooksState] = useState([]);

    useEffect(() => {
        if (bookCollections) {
            const existingBook = bookCollections.find(b => b.id === book.id);
            setIsBookListed(existingBook ? existingBook.group : 'Not listed');
        }
    }, [bookCollections])

    useEffect(() => {
        if (similarBooks) {
            setSimilarBooksState(similarBooks);
        }
    }, [similarBooks]);


    const handleStartReading = () => {
        navigate(`/chapter/${encodeURIComponent(chapters[0].content)}`, {
            state: {
                currentChapterIndex: 0,
                chapters: chapters,
                title: title,
            }
        });
    };

    const handleAddToPersonalList = (group) => {
        addBookToUser(book, group)
    };

    const handleMoveBook = (book, newGroup) => {
        moveBook(book, newGroup);
    };

    console.log(similarBooksState);


    return (
        <>
            <Div_Container>
                {/* WORK IS PROGRESS */}
                <h2>Similar Books: </h2>
                {similarBooksState.map((similarBook, index) => (
                    <div key={similarBook.id}>
                        <p>{similarBook.title}</p>
                    </div>

                    // <BookUnit
                    //     book={similarBook}
                    //     key={index}
                    // />
                ))}
                {/* WORK IS PROGRESS */}

                <Div_BannerWrapper>
                    <img src={book.banner} alt={'banner-tile'} />
                </Div_BannerWrapper>

                <button onClick={handleStartReading}>{t('bookFrontPage.startReading')}</button>

                {isLoggedIn && (
                    // {t('bookFrontPage.addBook')}
                    <>
                        <h3>Here is book status: {isBookListed} </h3>
                        <BookDropdown
                            onAddToPersonalList={handleAddToPersonalList}
                            isBookListed={isBookListed}
                            onMoveBook={handleMoveBook}
                            book={book}
                        ></BookDropdown>
                    </>
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

                <Div_TabsSection>
                    {activeTab === 'description' && (
                        <>
                            <h3>{title}</h3>
                            <p>{t('bookFrontPage.genres')}{book.filterInfo.genres.join(', ')}</p>
                            <p>{t('bookFrontPage.status')}{book.filterInfo.titleStatus}</p>
                            <p>{t('bookFrontPage.rating')}{book.filterInfo.adultRating}</p>
                            <Div_DescriptionTab>
                                <p>{description}</p>
                            </Div_DescriptionTab>
                        </>

                    )}

                    {activeTab === 'list' && (
                        <List
                            chapters={chapters}
                            title={title}
                        />
                    )}
                </Div_TabsSection>
            </Div_Container>
        </>
    )
}

const Div_Container = styled.div`
    padding-top: calc(var(--navbar-height) + 15px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100vw;
`;

const Div_BannerWrapper = styled.div`
    max-width: 1200px;
    height: 360px;
    border-radius: 15px;
  
 img {
    max-height: 100%;
    max-width: 100%;
    object-fit: cover;
    border-radius: 15px;
 }
`;

const Div_TabsSection = styled.div`
  background-color: var(--background-module-light);
  max-width: 1200px;
  margin-left: 3%;
  margin-right: 3%;
  border-radius: 10px;
`;

const Div_DescriptionTab = styled.div`
    border-bottom: 1px gray solid;
    border-top: 1px gray solid;
`;

