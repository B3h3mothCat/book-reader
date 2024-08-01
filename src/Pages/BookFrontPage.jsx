import List from "../components/Book/List"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react";
import MainNavBar from "../components/MainNavBar";


export default function BookFrontPage() {
    const { chapters, title, description } = useLocation().state;
    const [activeTab, setActiveTab] = useState('description')

    return (
        <>
            <MainNavBar></MainNavBar>

            <div>
                <div>here should be wide banner picture</div>
                <div>cover of book</div>
                <div>Button to start reaad From 1st page for now</div>

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

                {activeTab === 'description' && (
                    <div>
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
        </>
    )
}