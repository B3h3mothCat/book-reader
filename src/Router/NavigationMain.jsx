import { Route, Routes, Link } from 'react-router-dom'
import MainPage from '../Pages/MainPage'
import FileReaderPage from '../Pages/FileReaderPage'
// Book folder imports
import LibraryOfBooks from '../components/Book/LibraryOfBooks'
import SingleChapter from '../components/Book/SingleChapter'
import List from '../components/Book/List'
import BookFrontPage from '../Pages/BookFrontPage'
// Book folder imports
import LoginPage from '../Pages/LoginPage'

import PersonalAccount from '../components/PersonalAccount'



export default function NavigationMain() {
    return (
        <>
            <Routes>
                <Route exact path='/' element={<MainPage />}></Route>
                <Route exact path='/Login' element={<LoginPage />}></Route>
                <Route path='/read-file' element={<FileReaderPage />}></Route>
                {/* Book folder routes */}
                <Route exact path='/library' element={<LibraryOfBooks />} />
                <Route path='list/:listId' element={<List />} />
                <Route path='chapter/:chapterId' element={<SingleChapter />} />
                <Route path='/book-front/:bookId' element={<BookFrontPage />} />


                {/* <Route path='/catalog' element={<Catalog />} /> */}

                {/* Book folder routes */}
                <Route path='/account' element={<PersonalAccount />}></Route>

                <Route path='*' element={<MainPage />} />
            </Routes>
        </>
    )
}

