import { React, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Card from '../itemCard/card.component';
import "./cardList.styles.css";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import axios from "axios";

const CardList = ({ type, items, handleClick, checkoutData}) => {
    if (type === "default"){
        return(
            <div className="cardlist">
                {items.map(item => (
                <Card type = {"default"} handleClick={handleClick} key={item._id} item={item} />))}
            </div>
        );   
    }else if (type === "checkout"){
        return (
            <div className="cardlist">
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
                    <Accordion defaultActiveKey="0">
                        <Accordion.Header>{item.rest_id}</Accordion.Header>
                        <Accordion.Body>
                        <div className="cardlist">
                            {item.cust_items.map(it => (
                            <Card type = {"cart"} handleClick={handleClick} key={it.item._id} item={it.item} item_count={it.quantity}/>))}
                        </div>
                        <Link className="Link" to={`/checkout`} state={{ checkoutData }}>
                                        <Button variant="primary">Checkout</Button>
                                    </Link>
                        </Accordion.Body>
                    </Accordion>
                  ))
                }
            </div>
        );
    } else {
        return null;
    }
    
}

export default CardList;