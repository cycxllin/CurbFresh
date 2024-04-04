import { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import CardList from '../itemList/cardList.component';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { MyCartContext } from '../../Context/MyCartContext';


function CartPopup({showCartModal, toggleCartModal, selectedCustomer}){

    const {cart, setCart} = useContext(MyCartContext);
    //const [items, setItems] = useState([]);
    const [customer, setCustomer] = useState(null);
    //const [itemsList, setItemsList] = useState([]);
    useEffect(() => {
        setCustomer(selectedCustomer);
    }, [selectedCustomer]);

const handleClick = (item, quantity, restName, type) =>{
    if (type === "delete") {
        alert("Item Deleted from Cart!");
        const updatedCart = {...cart};
        const restIndex = updatedCart[selectedCustomer[0]].findIndex(res => res.rest_id === item.restID);
        const itemIndex = updatedCart[selectedCustomer[0]][restIndex].cust_items.findIndex(m_item => m_item.item === item);
        //delete the item at the item index
        updatedCart[selectedCustomer[0]][restIndex].cust_items.splice(itemIndex, 1);
        setCart(updatedCart);
      } else if (type === "update"){
        alert("Item Quantity Updated In Cart!");
        const updatedCart = {...cart};
        const restIndex = updatedCart[selectedCustomer[0]].findIndex(res => res.rest_id === item.restID);
        const itemIndex = updatedCart[selectedCustomer[0]][restIndex].cust_items.findIndex(m_item => m_item.item === item);
        //delete the item at the item index
        updatedCart[selectedCustomer[0]][restIndex].cust_items[itemIndex].quantity = quantity;
        setCart(updatedCart);
      }
}

      console.log(cart);
    if (selectedCustomer){
        const checkoutData = {customer: customer, cart: cart[selectedCustomer[0]]};
        return (
            <Modal show={showCartModal} onHide={toggleCartModal}>
                <ModalHeader closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </ModalHeader>
    
                <Modal.Body>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col sm-md">
                            <CardList type = {"cart"} items = {cart[selectedCustomer[0]]} checkoutData={checkoutData} handleClick = {handleClick}/>
                            </div>
    
                            <div class="col sm-md">
                            </div>
                        </div>
    
                    </div>
                </Modal.Body>
    
            </Modal>
        );
    } else {
        return (
            <Modal show={showCartModal} onHide={toggleCartModal}>
                <ModalHeader closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </ModalHeader>
    
                <Modal.Body>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col sm-md">
                            <CardList type = {"empty"}/>
                            </div>
    
                            <div class="col sm-md">
                            </div>
                        </div>
    
                    </div>
                </Modal.Body>
    
            </Modal>
        );
    }
}

export default CartPopup;