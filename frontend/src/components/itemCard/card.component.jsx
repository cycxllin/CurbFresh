import React from "react";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Link } from "react-router-dom";
import BootStrapCard from 'react-bootstrap/Card';
import "./card.styles.css";

const Card = ({ type, item, handleClick, item_count, restName}) => {
  const _id = item._id;
  const name = item.name;
  const price = item.price;
  const restID = item.restID;
  let count = item_count;
  var quantity = 1;
  var id = name + "quantity";

  function plusButtonClick() {
    if (type==="cart") {
      document.getElementById(id + "cart").value = ++count;
    } else {
      document.getElementById(id).value = ++quantity;
    }
    
  }
  function minusButtonClick() {
    if (type==="cart") {
      if (document.getElementById(id + "cart").value > 1){
        document.getElementById(id + "cart").value = --count;
      }
    } else {
      if (document.getElementById(id).value > 1){
        document.getElementById(id).value = --quantity;
      }
    }
  }

  if (type === "default"){
    return (
    <div className='card-container'>
      <img src={item.image} />
      <hr></hr>
      <div class="row">
        <div class="col-5">
          <h2 className="itemName">{name}</h2>
        <p>{price}</p>
        <p>{item.desc}</p>
        </div>
        <div class="col-7">
          <div class="row" className="quantity">
            <div class="col-3">
              <Button variant="primary" className="minus" onClick={minusButtonClick}>-</Button>
            </div>
            <div class="col-4">
              <input type="text" id={id} value="1" min="1"></input>
            </div>
            <div class="col-3">
              <Button variant="primary" className="plus" onClick={plusButtonClick}>+</Button>
            </div>
            </div>
            <Button variant="primary" onClick={() => handleClick(item, quantity, restName, "add")}>Add to Cart</Button>
        </div>
      </div>

      {/* <BootStrapCard style={{ width: '18rem' }}>
        <BootStrapCard.Img variant="top" src={item.image} />
        <BootStrapCard.Body>
          <BootStrapCard.Title>{name}</BootStrapCard.Title>
          <BootStrapCard.Text>
            Price: {price}
          </BootStrapCard.Text>
            <div class="row">
            <Button variant="primary" onClick={minusButtonClick}>-</Button>
            <input type="text" id={id} value="1" min="1"></input>
            <Button variant="primary" onClick={plusButtonClick}>+</Button>
            </div>
            <Button variant="primary" onClick={() => handleClick(item, quantity, restName, "add")}>Add to Cart</Button>
        </BootStrapCard.Body>
      </BootStrapCard> */}
    </div>
    );
  } else if (type === "cart") {
    return (
      <BootStrapCard style={{ width: '18rem' }}>
        <BootStrapCard.Img variant="top" src={item.image} />
        <BootStrapCard.Body>
          <BootStrapCard.Title>{name}</BootStrapCard.Title>
          <BootStrapCard.Text>
            Price: {price}
          </BootStrapCard.Text>
          <div class="row">
            <Button variant="primary" className="minus" onClick={minusButtonClick}>-</Button>
            <input type="text" id={id + "cart"} value={count} min="1"></input>
            <Button variant="primary" className="plus" onClick={plusButtonClick}>+</Button>
            </div>

            <Button variant="primary" className="delete" onClick={() => handleClick(item, count, restName, "delete")}>Delete</Button>
            <Button variant="primary" className="update" onClick={() => handleClick(item, count, restName, "update")}>Update</Button>
        </BootStrapCard.Body>
      </BootStrapCard>
    );
  } else if (type === "checkout"){
    return (
      <BootStrapCard style={{ width: '18rem' }}>
        <BootStrapCard.Img variant="top" src={item.image} />
        <BootStrapCard.Body>
          <BootStrapCard.Title>{name}</BootStrapCard.Title>
          <BootStrapCard.Text>
            Price: {price}
          </BootStrapCard.Text>
          <div class="row">
            <input type="text" id={id} value={count} min="1"></input>
            </div>
        </BootStrapCard.Body>
      </BootStrapCard>
    );
  }
}

export default Card;