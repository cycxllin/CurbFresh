import React from "react";
import { useEffect, useState, useLocation } from 'react'
import axios from 'axios';
import CustomerDropdown from "../components/CustomerDropdown/CustomerDropdown.component";
import CustomerTabs from "../components/CustomerTabs/CustomerTabs.component";
import { QueryClient, QueryClientProvider } from "react-query";
import CartPopup from "../components/CartPopup/CartPopup.component";
import CustomerHeader from "../components/CustomerHeader/CustomerHeader.component";
import { MyCartContext } from "../Context/MyCartContext";

const queryClient = new QueryClient();

function Customer() {
    const [cart, setCart] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("cart");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
      });
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showCartModal, setShowCartModal] = useState(false);
    const [customers, setCustomers] = useState([]);

    const toggleCartModal = () => {setShowCartModal(!showCartModal);};

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
                    <MyCartContext.Provider value={{ cart, setCart }}>
                        <CustomerHeader selectedCustomer={selectedCustomer}/>
                    </MyCartContext.Provider>
                    <CustomerDropdown setSelectedUser={setSelectedCustomer}/>
                </header>
                <body>
                    <div className="row">
                        <CustomerTabs selectedCustomer={selectedCustomer}/>
                        
                    </div>
                </body>
            </div>
        </QueryClientProvider>
    )
}

export default Customer;