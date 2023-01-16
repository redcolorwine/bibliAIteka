import React from 'react'
import rstyle from './footer.module.css';
import yt from './../../media/youtube.png';
import fb from './../../media/facebook.png';
import tw from './../../media/twitter.png';
import tg from './../../media/telegram.png';
import ins from './../../media/instagram.png';
import ld from './../../media/linkedin.png';
import phone from './../../media/phone.png';
import letter from './../../media/letter.png';
const Footer = () => {
    return (
        <div className={rstyle.footer}>
            <div className={rstyle.footerBlocks}>
                <div className={rstyle.logoBlock}>
                    <h1>BibliAIteka</h1>
                    <p>Наша БиблиАЙтека содержит книги на любой вкус! Прошу заметить, что книги взяты из открытого API,
                        потому мы не нарушаем какие-либо права. Мы не занимаемся продажей и предоставляем прямые ссылки на первоисточник.
                    </p>
                    <div className={rstyle.imgsBlock}>
                        <img src={fb} alt="" />
                        <img src={tw} alt="" />
                        <img src={yt} alt="" />
                        <img src={tg} alt="" />
                        <img src={ins} alt="" />
                        <img src={ld} alt="" />
                    </div>
                </div>
                <div className={rstyle.siteMap}>
                    <h2>КАРТА САЙТА</h2>
                    <ul>
                        <li>О НАС</li>
                        <li>КНИГИ</li>
                        <li>СОБЫТИЯ</li>
                        <li>БЛОГ</li>
                        <li>КОНТАКТЫ</li>
                    </ul>
                </div>
                <div className={rstyle.fcourses}>
                    <h2>КНИГИ</h2>
                    <ul>
                        <li>НОВИНКИ</li>
                        <li>ХУДОЖЕСТВЕННАЯ ЛИТЕРАТУРА</li>
                        <li>УЧЕБНАЯ ЛИТЕРАТУРА</li>
                        <li>ГЛАВНАЯ</li>
                    </ul>
                </div>
                <div className={rstyle.contacts}>
                    <h2>ДЛЯ СВЯЗИ</h2>
                    <ul>
                        <li><img src={phone} />1(123)454-02035</li>
                        <li><img src={letter} /> bibliAiteka.ru</li>
                    </ul>
                </div>
                <div className={rstyle.signUp}>
                    <h2>ПОДПИШИСЬ НА НАС</h2>
                    <input type="text" placeholder="Электронная почта" />
                    <p>**Подпишись для получения актуальной информации о новинках и поступлениях!
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Footer;