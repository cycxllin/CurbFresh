import {React, useState, useEffect} from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CardList from '../components/itemList/cardList.component';
import { useLocation, Link } from "react-router-dom";
import "./checkout.styles.css";

function Checkout() {
    const [validated, setValidated] = useState(false);
    const [pickupTimes, setPickupTimes] = useState([]);
    const [show, setShow] = useState(false);
    const [resName, setResName] = useState("");
    const { state: { customer, cart } = {} } = useLocation();
    const [storedCart, setStoredCart] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("cart");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
      });
    //const customer = checkoutData.customer;
    //items is a list of item objects
    //cart is a list of item dictionaries for the specific customer
    //format cart = [{item: I1, quantity: 1},...]
    //const cart = checkoutData.cart;
    const [formData, setFormData] = useState({
        custID: customer[0],
        restID: cart.rest_id,
        items: cartConversion(cart.cust_items),//need to convert the item object to just it's id for query
        orderStatus: "placed",
        pickupTime: 'ASAP',
        price: 0,
        active: true,
        notes: "",
        //created: "",
    }
    );

    useEffect(() => {
        const fetchPickupTimes = async () => {
          const response = await axios.get(`http://localhost:65500/restaurants/${cart.rest_id}`);
          const restaurant = response.data.data;
          const hours = restaurant[0].hours;
          setResName(restaurant[0].name);
          let temp = [{value: "ASAP", text: "ASAP"}];
          console.log(hours);
          for (var i = Number(hours.substring(0,2)); i < hours.substring(5,7); i++){
            temp.push({value: (i+"00").padStart(4, "0"), text: (i+":00").padStart(5, "0")});
          }
          console.log(temp);
          setPickupTimes(temp);
        };
    
        fetchPickupTimes();
      }, []);

    
    //converts our cart objects cust_item array into a suitable array for our query
    function cartConversion(cust_items) {
        let items = [];
        for (var i = 0; i < cust_items.length; i++) {
            items.push({item : cust_items[i].item._id, quantity: cust_items[i].quantity});
        }
        return items;
    }

    function cartSubtotal(cust_items){
        var subtotal = 0;
        for (var i = 0; i < cust_items.length; i++) {
            subtotal += cust_items[i].item.price;
        }
        return subtotal;
    }

    function getGST(subtotal){
        let GST = subtotal * 0.05;
        return GST;
    }

    //Change FormData
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // console.log(customer);
    // console.log(storedCart);

    const placeOrder = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        setValidated(true);
        let subTotal = cartSubtotal(cart.cust_items);
        let GST = getGST(subTotal);
        formData.price = (subTotal + GST).toFixed(2);

        try{
            const data = {
                user: [customer[0]],
                query: formData
            }
            console.log(data);
            const response = await axios.post("http://localhost:65500/orders", data);
            if (response.status === 200) {
                console.log("Order Placed!");
                setShow(true);
                //Trigger Thank You popup
                //alert("Order Placed Successfully!");
                //delete from localStorage cart
                //find index of the restaurant cart with cart.rest_id
                const cartIndex = storedCart[customer[0]].findIndex(res => res.rest_id === cart.rest_id);
                if (cartIndex > -1) { // only splice array when item is found
                    storedCart[customer[0]].splice(cartIndex, 1); // 2nd parameter means remove one item only
                }
                localStorage.setItem('cart', JSON.stringify(storedCart));
            } else {
                // Request failed
                console.error("Error placing order:", response.statusText);
                // Show error alert
                alert("Error placing order: " + response.statusText);
            }
        } catch (error) {
            if (error.response.status === 409) {//409 Item exists already
                const responseMsg = error.response.data;
                //console.log(existItem);
                console.error(`Cannot order, restaurant closed!`);
                alert(`Cannot order, restaurant closed! Please order again within business hours.`);
              }else {
                // Network error or other exception occurred
                console.error("Error adding item:", error.message);
                // Show error alert
                alert("Error adding item: " + error.message);
              }
        }
    }

    return (
        <div className="checkout-content">
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
                >
                <Modal show={show} backdrop="static">
                <Modal.Dialog>
                    <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <p>Your order was placed successfully thank you!</p>
                    </Modal.Body>

                    <Modal.Footer>
                    <Link className="Link" to={`/customer`}><Button variant="secondary">Go back to the main menu.</Button></Link>
                    </Modal.Footer>
                </Modal.Dialog>
                </Modal>
            </div>
            <h2 id="orderTitle">{resName} Order Review</h2>
            <hr />
            <CardList type = {"checkout"} items = {cart.cust_items}/>
            <hr />
            <Form noValidate validated={validated}>
                <Form.Group>
                    <Form.Label id="noteL">Leave an extra note with your order:</Form.Label>
                    <Form.Control id="notes"
                        name='notes'
                        as="textarea"
                        placeholder="Add any order notes!"
                        value={formData.notes}
                        autoFocus
                        onChange={handleChange}
                        />
                </Form.Group>
                <Form.Group>
                    <Form.Label id="pickL">Select a Pick-Up Time:</Form.Label>
                    <Form.Control id="pickTime"
                    required
                    as="select"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    >
                        {pickupTimes.map(times => (
                            <option value={times.value}>{times.text}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                
            </Form>
            <Button variant="primary" className="placeO" onClick={placeOrder}>Place Order</Button>
        </div>
    )
}

export default Checkout;