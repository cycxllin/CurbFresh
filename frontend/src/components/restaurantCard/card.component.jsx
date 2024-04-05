import {React, useContext} from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { MyCartContext } from "../../Context/MyCartContext";
import './card.styles.css'

const Card = ({ restaurant, handleClick, customer}) => {
  let link = "/restaurant";
  const {_id, name, phone, image, menu} = restaurant;
  const {cart, setCart} = useContext(MyCartContext);

  return (
    <div className='card-container'>
      <img src={image} />
      <hr></hr>
      <h2 className="restaurantName">{name}</h2>
      <p>Phone No.: {phone}</p>
      <p>Business Hours: {restaurant.hours}</p>
      <div className="Btns">
      <MyCartContext.Provider value={{ cart, setCart }}>
           <Link className="Link" to={`${link}`} state={{ restaurant, customer }}><Button variant="primary" className="shop">Shop</Button></Link>
      </MyCartContext.Provider>
      </div>
    </div>
  );
}

export default Card;