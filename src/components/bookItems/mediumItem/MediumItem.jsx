import React from 'react'
import { useNavigate } from 'react-router-dom';
import rstyle from './mediumItem.module.css';

const MediumItem = (props) => {
    let history = useNavigate();

    const handleClick = (event) => {
        history(`/book/${props.id}`);
    }

    return (
        <div className={rstyle.mediumItem} onClick={handleClick}>
            <img src={props.img} alt="book img" />
            <h4>{props.title}</h4>
            <p>{props.author}</p>
            <p><span>{props.price} Р</span></p>
        </div>

    )
}

export default MediumItem;