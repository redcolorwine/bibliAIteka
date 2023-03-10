import React, { useEffect, useState } from 'react'
import MediumItem from '../../components/bookItems/mediumItem/MediumItem';
import rstyle from './search.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import preloader from './../../media/svg/Spin-1.5s-204px.svg';
import axios from 'axios';

const Search = (props) => {

    let maxResults = 40;
    const [foundBooks, setFoundBooks] = useState([]);
    const [startIndex, setStartIndex] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [fetching, setFetching] = useState(true);
    const { query } = useParams();
    const [curQuery, setQuery] = useState(query);

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
        if (query != curQuery) {
            setQuery(query);
            setFoundBooks([]);
            setStartIndex(1);
            setTotalItems(0);
            setFetching(true);
        }
    }, [query])

    useEffect(() => {

        if (fetching) {
            console.log('fetching');

            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${curQuery}&key=${process.env.REACT_APP_API_KEY}&langRestrict=ru&maxResults=${maxResults}&startIndex=${startIndex}`).then(response => {
                setTotalItems(response.data.totalItems);
                setFoundBooks([...foundBooks, ...response.data.items]);
                setStartIndex(prevState => prevState + maxResults);
            }).finally(() => {
                setFetching(false);
            })
        }
    }, [fetching])


    // console.log(foundBooks.length);
    // console.log(totalItems);
    console.log('inViev: ' + inView);
    const scrollHandler = (e) => {
        /* 
        e.target.documentElement.scrollHeight - ?????????? ???????????? ???????????????? ?? ???????????? ??????????????
        e.target.documentElement.scrollTop - ?????????????? ?????????????????? ?????????????? ???? ????????
        window.innerHeight - ???????????? ?????????????? ?????????????? ????????????????
        */
        // if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && foundBooks.length < totalItems) {
        //     setFetching(true);
        // }
        if (inView && foundBooks.length < totalItems) {
            setFetching(true);
        }
    }

    if (foundBooks.length) {

        let f1oundBooks = foundBooks.map(book => {

            return (<MediumItem id={book.id} key={book.id} title={book.volumeInfo.title ? book.volumeInfo.title : '?????? ????????????????'} author={book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : '?????? ????????????'} price={book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : '??????????????????'} img={(`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w400-h600&source=gbs_api`)} />)
        })
        return (
            <div className={rstyle.searchPage}>
                <h1>?????????????????? ???? ???????????? ??????????????:</h1>
                <div className={rstyle.search}>

                    {f1oundBooks}
                    
                </div>
                <div className={rstyle.jakor} ref={ref}><img src={preloader} alt="" /></div>
            </div>

        )
    } else {
        return (
            <div className={rstyle.search}>
                <h2>???? ???????????? ?????????????? ???????????? ???? ??????????????</h2>
            </div>
        )
    }
}

export default Search;