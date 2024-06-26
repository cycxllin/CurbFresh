import React from 'react';
import Card from '../restaurantCard/card.component';
import "./cardList.styles.css";

const CardList = ({ restaurants, handleClick, customer }) => (
    <div className="cardlist-res">
        {restaurants.map(restaurant => (
            <Card handleClick={handleClick} key={restaurant._id} restaurant={restaurant} customer={customer}/>
        ))}
    </div>
)

export default CardList;