import React from 'react';
import Card from '../itemCard/card.component';
import "./cardList.styles.css";

const CardList = ({ items, handleClick }) => (
    <div className="cardlist">
        {items.map(item => (
            <Card handleClick={handleClick} key={item._id} item={item} />
        ))}
    </div>
)

export default CardList;