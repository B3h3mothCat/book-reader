import { useState } from 'react';
import Catalog from '../components/_Folder_To_Del/Catalog';
import ChaptersList from '../components/_Folder_To_Del/ChaptersList';

export default function CatalogPage() {
    const [selectedBook, setSelectedBook] = useState(null);

    const handleBookSelect = (book) => {
        setSelectedBook(book);
    };

    return (
        <div>
            {!selectedBook ? (
                <Catalog handleBookSelect={(handleBookSelect)} />
            ) : (
                <ChaptersList book={selectedBook} chapters={selectedBook.chapters} />
            )}
        </div>
    );
}