import React, { useState, useEffect } from "react";
import axios from "axios";
import './card.styles.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CardOrder = ( { order, selectedManager, resInfo } ) => {
    const { _id, custID, restID, items, orderStatus, pickupTime, price, active, notes, created } = order;
    const [pickupTimes, setPickupTimes] = useState([]);
    const [restaurant, setRestaurant] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      const url = `http://localhost:65500/restaurants/${restID}`;
      const response = await axios.get(url);
      console.log(response.data.data);
      setRestaurant(response.data.data[0]);
  }
    fetchRestaurant();
  }, []);


    let data = null;;
    let type = null;
    if (selectedManager[0][0] === "C") {
        type = "customer";
    }else {
        type = "Manager";
        if (notes === ""){
            order.notes ="none";
        }


        
    }

    //Set pickupTimes
    useEffect(() => {
      if (resInfo){
        let hours = resInfo.hours;
        let temp = [{value: "ASAP", text: "ASAP"}];
        for (var i = Number(hours.substring(0,2)); i < hours.substring(5,7); i++){
          temp.push({value: (i+"00").padStart(4, "0"), text: (i+":00").padStart(5, "0")});
        }
        setPickupTimes(temp);
      }
    }, [resInfo]);

    //Handle change in order status
    const handleChange = async (event) => {
        const { name, value } = event.target;

        const updatedValue = value;

        //update status here
        if (name === "orderStatus") {
          order.orderStatus = updatedValue;
        }else if (name === "pickUp"){
          order.pickupTime = updatedValue;
        }
        

        if (type === "customer") {
            data = {
                user: [selectedManager[0]],
                query: order
            }
        } else {
            data = {
                user: [selectedManager[0], selectedManager[1]],
                query: order
            }
        }

        //console.log(data);
        //Send to backend
        try {
            const url = `http://localhost:65500/orders/${order._id}`;
            const response = await axios.patch(url, data);
            if (response.status === 200) {//Success
                console.log("Success Update Order!!");
                alert(`Order Status for order ${order._id} updated successfully!`);
            } else if (response.status === 404) {//Permission denial
                console.log("Do not have permission to update to that status!");
                alert("Do not have permission to update to that status!");
            }else {
                // Request failed
                console.error("Error updating order status:", response.statusText);
                // Show error alert
                alert("Error updating order status: " + response.message);
            }
        } catch(error) {
            // Network error or other exception occurred
            console.error("Error updating order status:", error.message);
            // Show error alert
            alert("Error updating order status: " + error.message);
        }

    }

    if (type === "Manager"){
    return (
        <>
          <div className='card-container-order-m'>
            <h2><span className="sold">Order ID:</span> {order._id} <span className="sold">Customer:</span> {order.custID}</h2>
            <Form.Group>
                    <Form.Label id="pickL">Select a Pick-Up Time:</Form.Label>
                    <Form.Control id="pickTime"
                    name="pickUp"
                    required
                    as="select"
                    value={order.pickupTime}
                    onChange={handleChange}
                    >
                        {pickupTimes.map(times => (
                            <option value={times.value}>{times.text}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
            <p>
                <br/>
                <span className="sold">Total:</span> ${order.price}
                <br/>
                <span className="sold">Notes:</span> {order.notes}
            </p>
            <Form.Group className="mb-4">
                    <Form.Label>Order Status: </Form.Label>
                    <Form.Control 
                    as="select" 
                    required 
                    name="orderStatus"
                    value={order.orderStatus} 
                    onChange={handleChange}
                    >
                    <option value="placed" disabled={false} >Ordered</option>
                    <option value="in progress">In-Progress</option>
                    <option value="awaiting pickup">Awaiting Pickup</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">Select a status</Form.Control.Feedback>
                </Form.Group>
          </div>
    
        </>
      )
    }
    else if (type === "customer"){
        if (order.orderStatus === "placed") {
            return (
                <>
                  <div className='card-container-order'>
                    <h2><span className="sold">Order ID:</span> {order._id} <span className="sold">Restaurant:</span> {restaurant.name} <br></br><span className="sold">Customer:</span> {order.custID}</h2>
                    <p>Total: ${order.price}</p>
                    <p>Pickup Time: {order.pickupTime}</p>
                    <p>Status: {order.orderStatus}</p>
                    <Button variant="primary" onClick={handleChange} value={"canceled"}>Cancel Order</Button>
                  </div>
                </>
              )
        } else if (order.orderStatus === "awaiting pickup"){
            return (
                <>
                  <div className='card-container-order'>
                    <h2><span className="sold">Order ID:</span> {order._id} <span className="sold">Restaurant:</span> {restaurant.name} <br></br><span className="sold">Customer:</span> {order.custID}</h2>
                    <p>Total: ${order.price}</p>  
                    <p>Pickup Time: {order.pickupTime}</p>
                    <p>Status: {order.orderStatus}</p>
                    <Button variant="primary" onClick={handleChange} value={"completed"}>Picked Up</Button>
                  </div>
                </>
              )
        } else {
            return (
                <>
                  <div className='card-container-order'>
                    <h2><span className="sold">Order ID:</span> {order._id} <span className="sold">Restaurant:</span> {restaurant.name} <br></br><span className="sold">Customer:</span> {order.custID}</h2>
                    <p>Total: ${order.price}</p>
                    
                    <p>Pickup Time: {order.pickupTime}</p>
                    <p>Status: {order.orderStatus}</p>
                  </div>
                </>
              )
        }
    } else {
        return (
            <>
              <div className='card-container-order'>
                <h2><span className="sold">Order ID:</span> {order._id} <span className="sold">Restaurant:</span> {restaurant.name} <br></br><span className="sold">Customer:</span> {order.custID}</h2>
                <p>Total: ${order.price}</p>
                
                <p>Pickup Time: {order.pickupTime}</p>
                <Form.Group className="mb-4" id="orderSt">
                        <Form.Label>Order Status: </Form.Label>
                        <Form.Control 
                        as="select" 
                        required 
                        name="orderStatus"
                        value={order.orderStatus} 
                        onChange={handleChange}
                        >
                        <option value="placed" disabled={false} >Ordered</option>
                        <option value="in progress">In-Progress</option>
                        <option value="awaiting pickup">Awaiting Pickup</option>
                        <option value="completed">Completed</option>
                        <option value="canceled">Canceled</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Select a status</Form.Control.Feedback>
                    </Form.Group>
              </div>
        
            </>
          )
    }
}

export default CardOrder;

