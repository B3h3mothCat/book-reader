import List from "../components/Book/List"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react";
import { useAuth } from "../features/Authentication/AuthContext";
import { useTranslation } from "react-i18next";
import styled from "styled-components"

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
            <Div_Container>
                <Div_BannerWrapper> cover of book
                    <img src={book.banner} alt={'banner-tile'} />
                </Div_BannerWrapper>

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

