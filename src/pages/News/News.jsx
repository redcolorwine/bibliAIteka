import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MediumItem from '../../components/bookItems/mediumItem/MediumItem';
import rstyle from './news.module.css';

const News = () => {
    const [newBooks, setNewBooks] = useState('');
    let maxResults = 25;
    let lang = 'ru';

    useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=free-ebooks&download=epub&langRestrict=${lang}&maxResults=${maxResults}&key=${process.env.REACT_APP_API_KEY}`).then(response => {
            setNewBooks(response.data);
        })


    }, []);

    if (!newBooks) {
        return (
            <div>
                Загрузка...
            </div>
        )
    } else {
        console.log(newBooks);
        let new25Books = newBooks.items.map(book => {
            return (<MediumItem id={book.id} key={book.id} title={book.volumeInfo.title} author={book.volumeInfo.authors.join(', ')} price={book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : 'Бесплатно'} img={(`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w400-h600&source=gbs_api`)} />)
        })
        return (
            <div className={rstyle.news}>
                {new25Books}
            </div>
        )
    }
}

export default News;