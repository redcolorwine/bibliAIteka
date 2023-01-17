import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MediumItem from '../../components/bookItems/mediumItem/MediumItem';
import rstyle from './fiction.module.css';
import { useInView } from 'react-intersection-observer';
import preloader from './../../media/svg/Spin-1.5s-204px.svg';
const Fiction = () => {
    const [fictionBooks, setFictionBooks] = useState([]);
    const [startIndex, setStartIndex] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [fetching, setFetching] = useState(true);
    let maxResults = 40;
    let lang = 'ru';
    const { ref, inView } = useInView({
        threshold: 1.0
    })

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [totalItems, inView])

    useEffect(() => {
        if (fetching) {
            console.log('fetching');
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction&langRestrict=${lang}&maxResults=${maxResults}&key=${process.env.REACT_APP_API_KEY}&startIndex=${startIndex}`).then(response => {
                setTotalItems(response.data.totalItems);
                setFictionBooks([...fictionBooks, ...response.data.items]);
                setStartIndex(prevState => prevState + maxResults);
            }).finally(() => {
                setFetching(false);
            })
        }

    }, [fetching]);


    console.log('inViev: ' + inView);
    const scrollHandler = (e) => {

        if (inView && fictionBooks.length < totalItems) {
            setFetching(true);
        }
    }


    if (!fictionBooks) {
        return (
            <div>
                Загрузка...
            </div>
        )
    } else {
        console.log(fictionBooks);
        let fiction25Books = fictionBooks.map(book => {
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