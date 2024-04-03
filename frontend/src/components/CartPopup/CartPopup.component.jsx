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
    const [items, setItems] = useState([]);
    const [customer, setCustomer] = useState(null);
    const [itemsList, setItemsList] = useState([]);
    useEffect(() => {
        setCustomer(selectedCustomer);
    }, [selectedCustomer]);

    //Used to turn the list of item ids into retrieving data for each item from the database
    useEffect(() => {
        const fetchItems = async () => {
            setItems([]);
          if (selectedCustomer!=null){
              if (cart[selectedCustomer[0]] !== undefined) {
                  for (let i = 0; i < cart[selectedCustomer[0]].length; i++) {
                      let IdString = "";
                      let temp_items = cart[selectedCustomer[0]][i];
                      for (let j = 0; j < temp_items.cust_items.length; j++) {
                          IdString = IdString.concat(temp_items.cust_items[j].item) + ",";
                      }
                      IdString = IdString.slice(0, -1);
                      const url = `http://localhost:65500/items/list?menu=${IdString}`;
                      const response = await axios.get(url);
                      console.log(temp_items.rest_id);
                      setItems([{rest_id: temp_items.rest_id, cust_items: response.data.data}]);
                      console.log(items);
                  }
              }else {
                  setItems([]);
              }
          }
          
        };
        fetchItems();
      }, [selectedCustomer, cart]);

    //Assigns each item object to it's quantity in a dictionary
    useEffect(() => {
        // const fetchItemsList = async () => {
        //     const updatedList = [];
        //     if (items !== undefined) {
        //         for (var i = 0; i < items.length; i++){
        //             const itemIndex = cart[selectedCustomer[0]].findIndex(m_item => m_item.item === items[i]._id);
        //             console.log(itemIndex);
        //             updatedList[i] = {item: items[i], quantity: cart[selectedCustomer[i]][itemIndex].quantity};
        //             //console.log(itemsList);
        //         }
        //     } else{
        //         setItemsList([]);
        //     }
        //     setItemsList(updatedList);
        // };
    
        // fetchItemsList();
      }, [cart, items]);
    if (selectedCustomer){
        const checkoutData = {items: items, customer: customer, cart: cart[selectedCustomer[0]], itemsList: itemsList};
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
                                        Subtotal: ${cartSubtotal(items)}
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
                                        Subtotal: ${cartSubtotal(items)}
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