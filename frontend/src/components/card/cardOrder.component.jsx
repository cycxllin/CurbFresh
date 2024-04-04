import React, { useState } from "react";
import axios from "axios";
import './card.styles.css';
import Form from 'react-bootstrap/Form';

const CardOrder = ( { order, selectedManager } ) => {
    const { _id, custID, restID, items, orderStatus, pickupTime, price, active, notes, created } = order;

    //Handle change in order status
    const handleChange = async (event) => {
        const { name, value } = event.target;
        const updatedValue = value;

        //update status here
        order.orderStatus = updatedValue;

        //Send to backend
        try {
            const data = {
                user: [selectedManager[0], selectedManager[1]],
                query: order
            }
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

    return (
        <>
          <div className='card-container-order'>
            <h2><span className="sold">Order ID:</span> {order._id} <span className="sold">Customer:</span> {order.custID}</h2>
            <p>Total: ${order.price}</p>
            
            <p>Pickup Time: {order.pickupTime}</p>
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

export default CardOrder;

