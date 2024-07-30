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



export default function NavigationMain() {
    return (
        <>
            <Routes>
                <Route path='*' element={<MainPage />} />
                <Route exact path='/' element={<MainPage />}></Route>
                <Route exact path='/Login' element={<LoginPage />}></Route>
                <Route path='/read-file' element={<FileReaderPage />}></Route>

                {/* Book folder routes */}
                <Route path='library' element={<LibraryOfBooks />} />
                <Route path='list/:listId' element={<List />} />
                <Route path='chapter/:chapterId' element={<SingleChapter />} />


                <Route path='/book-front' element={<BookFrontPage />} />
                {/* Book folder routes */}
            </Routes>
        </>
    )
}

