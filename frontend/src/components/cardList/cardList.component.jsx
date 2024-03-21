import React from 'react';
import Card from '../card/card.component';
import "./cardList.styles.css";

const CardList = ({ items }) => (
    <div className="cardlist">
        {items.map(item => (
            <Card key={item.id} item={item} />
        ))}
    </div>
)

export default CardList;