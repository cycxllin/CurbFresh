import { React, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Card from '../itemCard/card.component';
import "./cardList.styles.css";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import axios from "axios";

const CardList = ({ type, items, handleClick, checkoutData, restName}) => {
    function cartSubtotal(items){
        var subtotal = 0;
        for (var i = 0; i < items.length; i++) {
            subtotal += items[i].item.price * items[i].quantity;
        }
        return subtotal;
    }

    if (type === "default"){
        return(
            <div className="cardlist-CusResI">
                {items.map(item => (
                <Card type = {"default"} handleClick={handleClick} key={item._id} item={item} restName={restName}/>))}
            </div>
        );   
    }else if (type === "checkout"){
        return (
            <div className="cardlist-out">
                {items.map(item => (
                <Card type = {"checkout"} handleClick={handleClick} key={item.item._id} item={item.item} item_count={item.quantity}/>))}
            </div>
        );
    } else if (type === "cart"){
        return (
            <div>
                {
                    //console.log(checkoutData)
                    //if type is cart we receive all the customers carts and must put each restaurant cart in an accordion
                    items.map(item => (
                    <div class="row">
                        <Accordion defaultActiveKey="0">
                        <Accordion.Header>{item.restName}</Accordion.Header>
                        <Accordion.Body>
                        <div className="cardlist-cart">
                            {item.cust_items.map(it => (
                            <Card type = {"cart"} handleClick={handleClick} key={it.item._id} item={it.item} item_count={it.quantity}/>))}
                        </div>

                        <div class="row">
                            <div class="col">
                                <h3>
                                    Subtotal: ${cartSubtotal(item.cust_items)}
                                </h3>
                            </div>
                            <div class="col">
                                <Link className="Link" to={`/checkout`} state={{customer: checkoutData.customer, cart: item }}>
                                        <Button variant="primary">Checkout</Button>
                                    </Link>
                            </div>

                        </div>

                        </Accordion.Body>
                    </Accordion>
                    </div>
                  ))
                }
            </div>
        );
    } else {
        return null;
    }
    
}

export default CardList;