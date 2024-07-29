import { Route, Routes, Link } from 'react-router-dom'
import MainPage from '../Pages/MainPage'
import FileReaderPage from '../Pages/FileReaderPage'

// Book folder imports
import LibraryOfBooks from '../components/Book/LibraryOfBooks'
import SingleChapter from '../components/Book/SingleChapter'
import List from '../components/Book/List'
// Book folder imports

import LoginPage from '../Pages/LoginPage'
import ExpReaderScreen from '../components/ExpReaderScreen'


export default function NavigationMain() {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to={'/'}>Main Page</Link></li>
                    <li><Link to={'/Login'}>Login page</Link></li>
                    <li><Link to={'/read-file'}>Read File</Link></li>
                    <br />
                    {/* Book folder routes */}
                    <li><Link to={'/library'}>LIBRARY</Link></li>
                    {/* Book folder routes */}
                    <br />
                </ul>
            </nav>

            <Routes>
                <Route path='*' element={<MainPage />} />
                <Route exact path='/' element={<MainPage />}></Route>
                <Route exact path='/Login' element={<LoginPage />}></Route>
                <Route path='/read-file' element={<FileReaderPage />}></Route>

                {/* Book folder routes */}
                <Route path='library' element={<LibraryOfBooks />} />
                <Route path='list/:listId' element={<List />} />
                <Route path='chapter/:chapterId' element={<SingleChapter />} />

                {/* Book folder routes */}


            </Routes>
        </>
    )

}

