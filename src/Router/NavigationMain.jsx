import { Route, Routes } from 'react-router-dom'
import MainPage from '../Pages/MainPage'
import FileReaderPage from '../Pages/FileReaderPage'
// Book folder imports
import LibraryOfBooks from '../features/Catalogue/LibraryOfBooks'
import SingleChapter from '../components/Book/SingleChapter'
import List from '../components/Book/List'
import BookFrontPage from '../Pages/BookFrontPage'
// Book folder imports
import LoginPage from '../Pages/LoginPage'
import PersonalAccount from '../features/PersonalAccount/PersonalAccount'
import LibraryPage from '../Pages/LibraryPage'
import MainNavBarLayout from '../components/layouts/MainNavBarLayout'

import MockPage from '../Pages/MockPage'

export default function NavigationMain() {
    return (
        <>
            <Routes>
                <Route element={<MainNavBarLayout />}>
                    <Route exact path='/' element={<MainPage />} />
                    <Route exact path='/Login' element={<LoginPage />} />
                    <Route exact path='/library' element={<LibraryPage />} />
                    <Route path='list/:listId' element={<List />} />
                    <Route path='/book-front/:bookId' element={<BookFrontPage />} />
                    <Route path='/account' element={<PersonalAccount />} />

                    <Route path='/mock' element={<MockPage />} />
                    <Route path='*' element={<MainPage />} />
                </Route>

                <Route path='chapter/:chapterId' element={<SingleChapter />} />
                <Route path='/read-file' element={<FileReaderPage />} />

            </Routes>
        </>
    )
}

