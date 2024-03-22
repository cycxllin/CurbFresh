import React from "react";
import './card.styles.css'

const Card = ( { item } ) => {
  const { id, name, email, phone } = item;


  return (
    <div className='card-container'>
      <h2>{name}</h2>
      <p>{email}</p>
      <p>{phone}</p>
    </div>
    )
};

export default Card;