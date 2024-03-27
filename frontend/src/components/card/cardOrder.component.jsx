import React, { useState } from "react";
import './card.styles.css';
import Button from 'react-bootstrap/Button';

const CardOrder = ( { item, selectedManager } ) => {
    const { _id, custID, restID, items, orderStatus, pickupTime, price, active, notes } = item;


    return (
        <>
          <div className='card-container'>
            <h2>{custID}</h2>
            <p>Order Status: {orderStatus} Total: ${price}</p>
          </div>
    
        </>
      )
}

export default CardOrder;

