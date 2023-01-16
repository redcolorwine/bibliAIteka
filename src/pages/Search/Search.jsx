import React, { useEffect, useState } from 'react'
import MediumItem from '../../components/bookItems/mediumItem/MediumItem';
import rstyle from './search.module.css';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const Search = (props) => {

    let maxResults = 40;
    const [foundBooks, setFoundBooks] = useState([]);
    const [startIndex, setStartIndex] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [fetching, setFetching] = useState(true);
    const { query } = useParams();

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [])

    useEffect(() => {
        if (fetching) {
            console.log('fetching');

            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.REACT_APP_API_KEY}&langRestrict=ru&maxResults=${maxResults}&startIndex=${startIndex}`).then(response => {
                setTotalItems(response.data.totalItems);
                setFoundBooks([...foundBooks, ...response.data.items]);
                setStartIndex(prevState => prevState + maxResults);
            }).finally(() => {

                setFetching(false);
            })
        }
    }, [fetching])

    const scrollHandler = (e) => {
        /* 
        e.target.documentElement.scrollHeight - ОБЩАЯ ВЫОСТА СТРАНИЦЫ С УЧЕТОМ СКРОЛЛА
        e.target.documentElement.scrollTop - ТЕКУЩЕЕ ПОЛОЖЕНИЯ СКРОЛЛА ОТ ТОПА
        window.innerHeight - ВЫСОТА ВИДИМОЙ ОБЛАСТИ СТРАНИЦЫ
        */
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && foundBooks.length < totalItems) {
            setFetching(true);
        }
    }

    if (foundBooks.length) {

        let f1oundBooks = foundBooks.map(book => {

            return (<MediumItem id={book.id} key={book.id} title={book.volumeInfo.title ? book.volumeInfo.title : 'Без названия'} author={book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Без автора'} price={book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : 'Бесплатно'} img={(`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w400-h600&source=gbs_api`)} />)
        })
        return (
            <div className={rstyle.searchPage}>
                <h1>Результат по Вашему запросу:</h1>
                <div className={rstyle.search}>

                    {f1oundBooks}
                </div>
            </div>

        )
    } else {
        return (
            <div className={rstyle.search}>
                <h2>По Вашему запросу ничего не найдено</h2>
            </div>
        )
    }
}

export default Search;