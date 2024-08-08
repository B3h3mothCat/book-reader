import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BOOKS_DATA_EN } from '../mock/data_en';
import { BOOKS_DATA_RU } from '../mock/data_ru';

const loadBooksData = (language) => {
  switch (language) {
    case 'ru':
      return BOOKS_DATA_RU;
    case 'en':
    default:
      return BOOKS_DATA_EN;
  }
};

const useBooksData = () => {
  const { i18n } = useTranslation();
  const [books, setBooks] = useState(loadBooksData(i18n.language));

  useEffect(() => {
    setBooks(loadBooksData(i18n.language));
  }, [i18n.language]);

  return books;
};

export default useBooksData;

// To make this hook properly switch books, we need to pass key to 
// <LibraryOfBooks key={i18n.language} />