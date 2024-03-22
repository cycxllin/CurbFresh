import React from 'react';
import Card from '../restaurantCard/card.component';
import "./cardList.styles.css";

const CardList = ({ restaurants, handleClick }) => (
    <div className="cardlist">
        {restaurants.map(restaurant => (
            <Card handleClick={handleClick} key={restaurant._id} restaurant={restaurant} />
        ))}
    </div>
)

export default CardList;