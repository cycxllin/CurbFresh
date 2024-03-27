import React from 'react';
import Card from '../card/card.component';
import CardOrder from '../card/cardOrder.component';
import "./cardList.styles.css";

function CardList ({ type, items, selectedManager }) {


    if (type === "Menu Items"){
        return (
        <div className="cardlist">
            <Card key={0} item={{"name": "Add Item"}} selectedManager={selectedManager}/>
            {items.map(item => (
                <Card key={item._id} item={item} selectedManager={selectedManager}/>
            ))}
        </div>
        )
    }else if (type === "Orders") {
        return (
            <div className="cardlist">
            {items.map(item => (
                <CardOrder key={item._id} order={item} selectedManager={selectedManager}/>
            ))}
        </div>
        )
    }
}

export default CardList;