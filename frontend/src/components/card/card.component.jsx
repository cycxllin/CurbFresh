import React, { useState } from "react";
import './card.styles.css'
import AddItemPopup from "../AddItemPopup/AddItemPopup.component";
import DeleteItemPopup from "../DeleteItemPopup/DeleteItemPopup.component";
import EditItemPopup from "../EditItemPopup/EditItemPopup.component";
import Button from 'react-bootstrap/Button';



const Card = ( { item , selectedManager} ) => {
  const { _id, restID, name, description, image, price, soldOut, active, category } = item;

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
        <div className='card-container-add' onClick={toggleAddModal}>
          <h1 className="add-t">{name}</h1>
          <h2 className="add">+</h2>
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
        <img src={image} />
        <hr></hr>
        <h2 className="itemName">{name} ${price}</h2>
        <p className="desc">{description}</p>
        <p><span className="sold">Sold out:</span> {soldOut.toString()}</p>
        <hr></hr>
        <div className ="Btns">
          <Button className="delete" onClick={toggleDelModal} >Delete</Button>{' '}
          <Button className="edit" onClick={toggleEditModal}>Edit</Button>{' '}
        </div>
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