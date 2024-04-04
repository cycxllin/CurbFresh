import React from "react";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Link } from "react-router-dom";
import BootStrapCard from 'react-bootstrap/Card';

const Card = ({ type, item, handleClick, item_count, restName}) => {
  const _id = item._id;
  const name = item.name;
  const price = item.price;
  const restID = item.restID;
  var quantity = 1;
  var id = name + "quantity";

  function plusButtonClick() {
    document.getElementById(id).value = ++quantity;
  }
  function minusButtonClick() {
    if (document.getElementById(id).value > 1){
      document.getElementById(id).value = --quantity;
    }
  }

  if (type === "default"){
    return (
      <BootStrapCard style={{ width: '18rem' }}>
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
            <Button variant="primary" onClick={() => handleClick(item, quantity, restName)}>Add to Cart</Button>
        </BootStrapCard.Body>
      </BootStrapCard>
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
            <Button variant="primary" onClick={minusButtonClick}>-</Button>
            <input type="text" id={id} value={item_count} min="1"></input>
            <Button variant="primary" onClick={plusButtonClick}>+</Button>
            </div>

            {/* implement on-click!!!! */}
            <Button variant="primary" onClick={null}>Update</Button>
            <Button variant="primary" onClick={null}>Delete</Button>
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
            <input type="text" id={id} value={item_count} min="1"></input>
            </div>
        </BootStrapCard.Body>
      </BootStrapCard>
    );
  }
}

export default Card;