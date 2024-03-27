import React, { useState } from "react";
import './card.styles.css'
import AddItemPopup from "../AddItemPopup/AddItemPopup.component";
import DeleteItemPopup from "../DeleteItemPopup/DeleteItemPopup.component";
import EditItemPopup from "../EditItemPopup/EditItemPopup.component";
import Button from 'react-bootstrap/Button';


const Card = ( { item , selectedManager} ) => {
  const { _id, restID, name, description, price, soldOut, active, category } = item;

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const toggleAddModal = () => {setShowAddModal(!showAddModal);}
  const toggleDelModal = () => {setShowDelModal(!showDelModal);}
  const toggleEditModal = () => {setShowEditModal(!showEditModal);}
  
  //console.log("??" + selectedManager[0]);
  
  if (name === "Add Item") {
    return (
      <>
        <div className='card-container' onClick={toggleAddModal}>
          <h1 className="add">{name}</h1>
          <h2 className="add">+</h2>
          <h2 className="O">O</h2>
        </div> 

        <AddItemPopup
          showAddModal = {showAddModal}
          toggleAddModal= {toggleAddModal}
          selectedManager = {selectedManager}
        />
      </>
    )
  }

  return (
    <>
      <div className='card-container'>
        <h2>{name} ${price}</h2>
        <p>{description}</p>
        <p>Sold out={soldOut.toString()} Category: {category}</p>
        <Button className="delete" variant="danger" onClick={toggleDelModal} >Delete</Button>{' '}
        <Button className="edit" variant="warning" onClick={toggleEditModal}>Edit</Button>{' '}
      </div>

      <DeleteItemPopup
        showDelModal = {showDelModal}
        toggleDelModal= {toggleDelModal}
        selectedManager = {selectedManager}
        item = {item}
      />

      <EditItemPopup
        showEditModal = {showEditModal}
        toggleEditModal= {toggleEditModal}
        selectedManager = {selectedManager}
        item = {item}
      />
    </>
  )
};

export default Card;