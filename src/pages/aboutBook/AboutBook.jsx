import React, { useEffect, useState } from 'react'
import rstyle from './aboutBook.module.css';
import book from './../../media/book.jpg';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AboutBook = (props) => {

    const [bookInfo, setBookInfo] = useState('');
    const { id } = useParams();
    let maxResults = 10;
    let lang = 'ru';

    useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?langRestrict=ru`).then(response => {
            setBookInfo(response.data);
        })
    }, [id])


    if (!bookInfo) {

        return (<div>
            Загрузка...
        </div>)

    } else {

        console.log(bookInfo);
        return (
            <div className={rstyle.aboutBook}>
                <div className={rstyle.aboutBlock}>
                    <div className={rstyle.imgBLock}>
                        <img src={(`https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w400-h600&source=gbs_api`)} alt="" />
                        <div className={rstyle.buy}>
                            <button className={rstyle.buyBut}><a href={bookInfo.volumeInfo.infoLink}>Купить</a></button>
                            <p><span>{bookInfo.saleInfo.listPrice ? bookInfo.saleInfo.listPrice.amount + ' Р.' : 'Бесплатно'}</span></p>

                        </div>
                        <button className={rstyle.readBut}><a href={`https://play.google.com/store/books/details?id=${id}`}>Читать ознакомительный фрагмент </a></button>
                    </div>

                    <div className={rstyle.aboutText}>
                        <h2>{bookInfo.volumeInfo.title}</h2>
                        <h4>{bookInfo.volumeInfo.authors ? bookInfo.volumeInfo.authors.join(', ') : 'Без автора'}</h4>
                        <p>{bookInfo.volumeInfo.categories ? bookInfo.volumeInfo.categories.join(' / ') : 'Без категории'}</p>
                        <p><span>{bookInfo.volumeInfo.publishedDate}</span></p>

                        <p className={rstyle.bookInfo}><span>Краткое описание: </span>{bookInfo.volumeInfo.description}</p>

                    </div>
                </div>
            </div>
        )
    }

}

export default AboutBook;