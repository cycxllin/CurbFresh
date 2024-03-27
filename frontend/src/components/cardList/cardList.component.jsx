import React, { useState, useEffect} from 'react';
import Card from '../card/card.component';
import "./cardList.styles.css";

function CardList ({ items, selectedManager }) {

    return (
    <div className="cardlist">
        <Card key={0} item={{"name": "Add Item"}} selectedManager={selectedManager}/>
        {items.map(item => (
            <Card key={item._id} item={item} selectedManager={selectedManager}/>
        ))}
        
    </div>
    )
}

export default CardList;