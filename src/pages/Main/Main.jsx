import React, { useEffect, useState } from 'react'
import MediumItem from '../../components/bookItems/mediumItem/MediumItem';
import rstyle from './main.module.css';
import book from './../../media/book.jpg';
import axios from 'axios';
const Main = () => {
    const [mainBooks, setMainBooks] = useState('');
    let maxResults = 25;
    let lang = 'ru';

    useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=paid-ebooks&download=epub&langRestrict=${lang}&maxResults=${maxResults}&key=${process.env.REACT_APP_API_KEY}`).then(response => {
            setMainBooks(response.data);
        })
        // axios.get(`https://www.googleapis.com/books/v1/volumes?q=paid-ebooks&download=epub&langRestrict=ru&maxResults=20&key=AIzaSyCTKwBI3u8RQGfg_ChozmfYV93st3DlFwY`).then(response => {
        //     setMainBooks(response.data);
        // })

    }, []);

    if (!mainBooks) {
        return (
            <div>
                Загрузка...
            </div>
        )
    } else {
        console.log(mainBooks);
        let main25Books = mainBooks.items.map(book => {
            return (<MediumItem id={book.id} key={book.id} title={book.volumeInfo.title} author={book.volumeInfo.authors.join(', ')} price={book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : 'Бесплатно'} img={(`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w400-h600&source=gbs_api`)} />)
        })
        return (
            <div className={rstyle.main}>
                {main25Books}
            </div>
        )
    }

}

export default Main;