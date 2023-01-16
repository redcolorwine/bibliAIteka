import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MediumItem from '../../components/bookItems/mediumItem/MediumItem';
import rstyle from './fiction.module.css';

const Fiction = () => {
    const [fictionBooks, setFictionBooks] = useState('');
    let maxResults = 25;
    let lang = 'ru';

    useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=fiction&langRestrict=${lang}&maxResults=${maxResults}&key=${process.env.REACT_APP_API_KEY}`).then(response => {
            setFictionBooks(response.data);
        })


    }, []);

    if (!fictionBooks) {
        return (
            <div>
                Загрузка...
            </div>
        )
    } else {
        console.log(fictionBooks);
        let fiction25Books = fictionBooks.items.map(book => {
            return (<MediumItem id={book.id} key={book.id} title={book.volumeInfo.title} author={book.volumeInfo.authors?book.volumeInfo.authors.join(', '):'Без автора'} price={book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : 'Бесплатно'} img={(`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w400-h600&source=gbs_api`)} />)
        })
        return (
            <div className={rstyle.fiction}>
                {fiction25Books}
            </div>
        )
    }
}

export default Fiction;