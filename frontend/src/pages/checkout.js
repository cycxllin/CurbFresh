import {React, useState} from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck'
import Button from 'react-bootstrap/Button';
import CardList from '../components/itemList/cardList.component';
import { useLocation, Link } from "react-router-dom";

function Checkout() {
    const [validated, setValidated] = useState(false);
    const { state: { customer, cart } = {} } = useLocation();
    const [storedCart, setStoredCart] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("cart");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
      });
    console.log(cart);
    //const customer = checkoutData.customer;
    //items is a list of item objects
    //cart is a list of item dictionaries for the specific customer
    //format cart = [{item: I1, quantity: 1},...]
    //const cart = checkoutData.cart;
    console.log(cart);
    const [formData, setFormData] = useState({
        custID: customer[0],
        restID: cart.rest_id,
        items: cartConversion(cart.cust_items),//need to convert the item object to just it's id for query
        orderStatus: "placed",
        pickupTime: 'ASAP',
        price: 0,
        active: true,
        notes: "none",
        //created: "",
    }
    );

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

    console.log(customer);
    console.log(storedCart);

    const placeOrder = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        setValidated(true);
        let subTotal = cartSubtotal(cart.cust_items);
        let GST = getGST(subTotal);
        formData.price = subTotal + GST;

        try{
            const data = {
                user: [customer[0]],
                query: formData
            }
            console.log(data);
            const response = await axios.post("http://localhost:65500/orders", data);
            if (response.status === 200) {
                console.log("Order Placed!");
                //Trigger Thank You popup
                alert("Order Placed Successfully!");
                //delete from localStorage cart
                //find index of the restaurant cart with cart.rest_id
                const cartIndex = storedCart[customer[0]].findIndex(res => res.rest_id === cart.rest_id);
                if (cartIndex > -1) { // only splice array when item is found
                    storedCart[customer[0]].splice(cartIndex, 1); // 2nd parameter means remove one item only
                }
                localStorage.setItem('cart', JSON.stringify(storedCart));

                //send to customer page
                <Link className="Link" to={`/customer`}>Link</Link>
            } else {
                // Request failed
                console.error("Error placing order:", response.statusText);
                // Show error alert
                alert("Error placing order: " + response.statusText);
            }
        } catch (error) {
            // Network error or other exception occurred
            console.error("Error placing order:", error.message);
            // Show error alert
            alert("Error placing order: " + error.message);
        }
    }

    return (
        <div>
            <CardList type = {"checkout"} items = {cart.cust_items}/>
            <Form noValidate validated={validated}>
                <Form.Group>
                    <Form.Label>Pick-Up Time</Form.Label>
                    <Form.Check
                        inline
                        label="ASAP"
                        name="pickUpTime"
                        value='ASAP'
                        type='radio'
                        id={`inline-radio-1`}
                    />
                    <Form.Check
                        inline
                        label="Custom Time"
                        name="pickUpTime"
                        type='radio'
                        id={`inline-radio-2`}
                    />
                    <Form.Control
                        name='pickUpTime'
                        id = 'pickUpTimeText'
                        required
                        type="text"
                        placeholder="Input a Pick Up Time (HH:MM)"
                        value=''
                        autoFocus
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                            name='notes'
                            required
                            type="text"
                            placeholder="Add any order notes!"
                            value="a note"
                            autoFocus
                            onChange={handleChange}
                        />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={placeOrder}>Place Order</Button>
        </div>
    )
}

export default Checkout;