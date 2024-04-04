import { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import CardList from '../itemList/cardList.component';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { MyCartContext } from '../../Context/MyCartContext';

function cartSubtotal(items){
    var subtotal = 0;
    for (var i = 0; i < items.length; i++) {
        subtotal += items[i].price;
    }
    return subtotal;
}


function CartPopup({showCartModal, toggleCartModal, selectedCustomer}){

    const {cart, setCart} = useContext(MyCartContext);
    //const [items, setItems] = useState([]);
    const [customer, setCustomer] = useState(null);
    //const [itemsList, setItemsList] = useState([]);
    useEffect(() => {
        setCustomer(selectedCustomer);
    }, [selectedCustomer]);

    // //Used to turn the list of item ids into retrieving data for each item from the database
    // //sets items to an array of dictionaries with restIds and item objects.
    // useEffect(() => {
    //     const fetchItems = async () => {
    //         setItems([]);
    //       if (selectedCustomer!=null){
    //             const tempItems = [];
    //           if (cart[selectedCustomer[0]] !== undefined) {
    //               for (let i = 0; i < cart[selectedCustomer[0]].length; i++) {
    //                   let IdString = "";
    //                   let temp_items = cart[selectedCustomer[0]][i];
    //                   for (let j = 0; j < temp_items.cust_items.length; j++) {
    //                       IdString = IdString.concat(temp_items.cust_items[j].item) + ",";
    //                   }
    //                   IdString = IdString.slice(0, -1);
    //                   const url = `http://localhost:65500/items/list?menu=${IdString}`;
    //                   const response = await axios.get(url);
    //                   console.log(temp_items.rest_id);
    //                   tempItems.push({ rest_id: temp_items.rest_id, cust_items: response.data.data });
    //               }
    //               setItems(tempItems);
    //           }else {
    //               setItems([]);
    //           }
    //       }
          
    //     };
    //     fetchItems();
    //   }, [selectedCustomer, cart]);

    // //Assigns each item object to it's quantity in a dictionary
    // //an array of dictionaries that look like {item: Item item, quantity: Number quantity}
    // useEffect(() => {
    //     const fetchItemsList = async () => {
    //         // const updatedList = [];
    //         // if (items !== undefined) {
    //         //     //this first for loop goes through each cart the customer has from every present restaurant
    //         //     for (var i = 0; i < cart[selectedCustomer[0].length]; i++){
    //         //         //this second for loop goes through each item in a customers cart specific to cart[i]'s restaurant - we get item quantity from here
    //         //         for (var j = 0; j < cart[selectedCustomer[0]][i].cust_items.length; j++){
    //         //             //this goes through each object in our list of items - we get the item objects from this list
    //         //             for (var k in items) {
    //         //                 k.cust_items // this returns the restaurants cust_items list of item
    //         //                 const itemIndex = cart[selectedCustomer[0]][i].cust_items.findIndex(m_item => m_item.item === items[i]._id);
    //         //                 for (){
                                
    //         //                 }
    //         //             }
    //         //             console.log(itemIndex);
    //         //         }
    //         //         updatedList[i] = {item: items[i], quantity: cart[selectedCustomer[i]][itemIndex].quantity};
    //         //         //console.log(itemsList);
    //         //     }
    //         // } else{
    //         //     setItemsList([]);
    //         // }
    //         // setItemsList(updatedList);
    //     };
    
    //     fetchItemsList();
    //   }, [cart, items]);

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
                            <CardList type = {"cart"} items = {cart[selectedCustomer[0]]} checkoutData={checkoutData}/>
                            </div>
    
                            <div class="col sm-md">
                                <Modal.Footer>
                                    <h3>
                                        Subtotal: ${}
                                    </h3>
                                </Modal.Footer>
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
                                <Modal.Footer>
                                    <h3>
                                        Subtotal: ${}
                                    </h3>
                                </Modal.Footer>
                            </div>
                        </div>
    
                    </div>
                </Modal.Body>
    
            </Modal>
        );
    }
}

export default CartPopup;