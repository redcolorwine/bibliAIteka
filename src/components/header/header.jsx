import React, { createRef, useEffect, useRef, useState } from 'react'
import rstyle from './header.module.css';
import logo from './../../media/logo.png';
import book from './../../media/book.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import env from 'react-dotenv';
import axios from 'axios';
import SmallItem from '../bookItems/smallItem/smallItem';
import { NavLink, useNavigate } from 'react-router-dom';
const Header = () => {
    const [newBooks, setNewBoos] = useState('');
    const [foundBooks, setFoundBooks] = useState('');
    const [queryRef, setQuery] = useState('');
    let maxResults = 5;
    let lang = 'ru';
    const history = useNavigate();
    
    useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=free-ebooks&download=epub&key=${process.env.REACT_APP_API_KEY}&langRestrict=ru&maxResults=${maxResults}`).then(response => {
            setNewBoos(response.data);
        })
    }, [])


    const findBooks = (query) => {
        history(`/search/${queryRef}`);
    }

    if (!newBooks) {
        return (
            <div>
                Загрузка...
            </div>
        )
    } else {

        let new5books = newBooks.items.map(book => {
            return (<SmallItem id={book.id} key={book.id} title={book.volumeInfo.title} author={book.volumeInfo.authors.join(', ')} price={book.saleInfo.listPrice ? book.saleInfo.listPrice.amount + ' Р.' : 'Бесплатно'} img={(`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w400-h600&source=gbs_api`)} />)
        })
        return (
            <div className={rstyle.header}>
                <div className={rstyle.headingWrapper}>
                    <div className={rstyle.headingNav}>
                        <nav className={rstyle.leftNav}>
                            <li>НАЙТИ МАГАЗИН</li>
                            <li>ПОМОЩЬ</li>
                        </nav>
                        <nav className={rstyle.rightNav}>
                            <li>ИЗБРАННОЕ</li>
                            <li>О НАС</li>
                            <li>КОНТАКТЫ</li>
                            <li>ЯЗЫК</li>
                        </nav>
                    </div>

                    <div className={rstyle.logo}>
                        <img src={logo} alt="" />
                        <a href="#">АВТОРИЗОВАТЬСЯ</a>
                    </div>

                    <div className={rstyle.search}>
                        <input type="search" className={rstyle.searchTerm} id="site-search" name="q" onChange={(e) => { setQuery(e.target.value) }} />
                        <button className={rstyle.searchButton} onClick={() => { findBooks(queryRef) }}><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                    <h1>Новинки: </h1>
                    <div className={rstyle.new5books}>

                        {new5books}


                    </div>
                </div>
                <nav className={rstyle.mainNav}>
                    <li><NavLink to="/">ГЛАВНАЯ</NavLink></li>
                    <li><NavLink to="/new">НОВИНКИ</NavLink></li>
                    <li><NavLink to="/fiction">ХУДОЖЕСТВЕННАЯ ЛИТЕРАТУРА</NavLink></li>
                    <li><NavLink to="/education">УЧЕБНАЯ ЛИТЕРАТУРА</NavLink></li>
                </nav>
            </div>

        )
    }

}

export default Header