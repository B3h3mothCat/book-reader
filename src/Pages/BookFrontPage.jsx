import List from "../components/Book/List"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react";
import MainNavBar from "../components/MainNavBar";


export default function BookFrontPage() {
    const { chapters, title, description, book } = useLocation().state;
    const [activeTab, setActiveTab] = useState('description')
    const navigate = useNavigate()

    const handleStartReading = () => {
        navigate(`/chapter/${encodeURIComponent(chapters[0].content)}`, {
            state: {
                currentChapterIndex: 0,
                chapters: chapters,
                title: title,
            }
        });
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
                        <div className="desription-tab">
                            <h3>{title}</h3>
                            <p>{description}</p>
                        </div>
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