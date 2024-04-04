import {React, useContext} from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import BootStrapCard from 'react-bootstrap/Card';
import { MyCartContext } from "../../Context/MyCartContext";

const Card = ({ restaurant, handleClick, customer}) => {
  let link = "/restaurant";
  const {_id, name, phone, image, menu} = restaurant;
  const {cart, setCart} = useContext(MyCartContext);

  return (
    <BootStrapCard style={{ width: '18rem' }}>
      <BootStrapCard.Img variant="top" src={image} />
      <BootStrapCard.Body>
        <BootStrapCard.Title>{name}</BootStrapCard.Title>
        <BootStrapCard.Text>
          Phone Number: {phone}
        </BootStrapCard.Text>
        <MyCartContext.Provider value={{ cart, setCart }}>
          <Link className="Link" to={`${link}`} state={{ restaurant, customer }}><Button variant="primary">Go To Store</Button></Link>
        </MyCartContext.Provider>
      </BootStrapCard.Body>
    </BootStrapCard>
  );
}

export default Card;