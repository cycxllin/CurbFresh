import React from "react";
import { useEffect, useState } from 'react'
import axios from 'axios';
import CardList from '../components/restaurantList/cardList.component';
import CustomerDropdown from "../components/CustomerDropdown/CustomerDropdown.component";
import CustomerTabs from "../components/CustomerTabs/CustomerTabs.component";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function Customer() {
    const [selectedCustomer, setSelectedCustomer] = useState([]);
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

    return (
        <QueryClientProvider client={queryClient}>
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
                        <CustomerDropdown setSelectedUser={setSelectedCustomer}/>
                    </div>
                </header>
                <body>
                    <div className="row">
                        <CustomerTabs selectedCustomer={selectedCustomer}/>
                    </div>
                    {/* console.log({restaurants}); */}
                    <CardList
                        restaurants = {restaurants}
                        />
                </body>
            </div>
        </QueryClientProvider>
    )
}

export default Customer;