import {React, useState} from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck'
import Button from 'react-bootstrap/Button';
import CardList from '../components/itemList/cardList.component';
import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
    const [validated, setValidated] = useState(false);
    const { state: { checkoutData } = {} } = useLocation();
    const customer = checkoutData.customer;
    //items is a list of item objects
    const items = checkoutData.items;
    //cart is a list of item dictionaries for the specific customer
    //format cart = [{item: I1, quantity: 1},...]
    const cart = checkoutData.cart;
    const itemsList = checkoutData.itemsList;
    console.log(cart);
    console.log(items);
    const [formData, setFormData] = useState({
        custID: customer[0],
        restID: items[0].restID,
        items: cart,
        orderStatus: "placed",
        pickupTime: 'ASAP',
        price: 0,
        active: true,
        notes: "none",
        //created: "",
    }
    );

    function cartSubtotal(items){
        var subtotal = 0;
        for (var i = 0; i < items.length; i++) {
            subtotal += items[i].price;
        }
        return subtotal;
    }

    //Change FormData
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const placeOrder = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        setValidated(true);
        let date = new Date().toJSON();
        //formData.created = date;
        formData.price = cartSubtotal(items);

        try{
            const data = {
                user: [customer[0]],
                query: formData
            }
            const response = await axios.post("http://localhost:65500/orders", data);
            if (response.status === 200) {
                console.log("Order Placed!");
                //Trigger Thank You popup
                alert("Order Placed Successfully!");
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
            <CardList type = {"checkout"} items = {itemsList}/>
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