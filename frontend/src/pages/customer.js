import React from "react";
import { useEffect, useState } from 'react'
import axios from 'axios';
import CardList from '../components/restaurantList/cardList.component';
//import {Dropdown, GridColumn} from "semantic-ui-react";

function Customer() {
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
      const fetchRestaurants = async () => {
        const response = await axios.get("http://localhost:65500/restaurants");
        setRestaurants(response.data.data);
      };
  
      fetchRestaurants();
    }, []);

    const [customers, setCustomers] = useState([]);
    useEffect(() => {
      const fetchCustomers = async () => {
        const response = await axios.get("http://localhost:65500/customers");
        setCustomers(response.data.data);
      };
  
      fetchCustomers();
    }, []);

    //For dropdown list formatting, turning the fetched customers into an array with key values
    const options = [];
    for (let i = 0; i < customers.length; i++) {
        const placeholder = {key:customers[i]._id, text:customers[i].fName + customers[i].lName, value:customers[i].fName}
        options.push(placeholder);
    }

    return (
        <div>
            <head>
                <title>CurbFresh Customer Screen</title>
            </head>

            <header>
                <div className="row sm-md">
                    <div className="col sm-md">
                        <h2>CurbFresh</h2>
                    </div>
                    <div className="col sm-md">
                        <h2>Enter Your Address</h2>
                    </div>
                    {/* <div className="col sm-md">
                        <Dropdown
                            placeholder="Select Student Name"
                            fluid
                            selection
                            options={options}
                        />
                    </div> */}
                </div>
            </header>
            <body>
                <div className="row">

                </div>
                {/* console.log({restaurants}); */}
                <CardList
                    restaurants = {restaurants}
                    />
            </body>
        </div>
    )
}

export default Customer;