import React from "react";
import { useEffect, useState, useLocation } from 'react'
import axios from 'axios';
import CustomerDropdown from "../components/CustomerDropdown/CustomerDropdown.component";
import CustomerTabs from "../components/CustomerTabs/CustomerTabs.component";
import { QueryClient, QueryClientProvider } from "react-query";
import CartPopup from "../components/CartPopup/CartPopup.component";
import CustomerHeader from "../components/CustomerHeader/CustomerHeader.component";
import { MyCartContext } from "../Context/MyCartContext";
//import "./customer.styles.css";

const queryClient = new QueryClient();

function Customer() {
    const [cart, setCart] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("cart");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
      });
      // const [selectedCustomer, setSelectedCustomer] = useState(() => {
      //   // getting stored cart
      //   const savedCustomer = localStorage.getItem("customer");
      //   //if we have a cart cached then we use that and set it to our context else its empty
      //   if (savedCustomer !== undefined){
      //     const initialValue = JSON.parse(savedCustomer);
      //     return initialValue || "";
      //   } else {
      //     return null;
      //   }
      // });
      const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showCartModal, setShowCartModal] = useState(false);
    const [customers, setCustomers] = useState([]);

    const toggleCartModal = () => {setShowCartModal(!showCartModal);};

      //setting selected customer into cache to save what customer has been selected
    useEffect(() => {
        localStorage.setItem('customer', JSON.stringify(selectedCustomer));
      }, [selectedCustomer]);

    useEffect(() => {
      const fetchCustomers = async () => {
        const response = await axios.get("http://localhost:65500/customers");
        setCustomers(response.data.data);
      };
  
      fetchCustomers();
    }, []);

    console.log(window.location.href);
    return (
        <QueryClientProvider client={queryClient}>
            <div class="Customer">
                <head>
                    <title>CurbFresh Customer Screen</title>
                </head>

                <header>
                    <div class="row sm-md">
                        <div class="col-10 sm-md">
                        <MyCartContext.Provider value={{ cart, setCart }}>
                        <CustomerHeader selectedCustomer={selectedCustomer}/>
                    </MyCartContext.Provider>
                        </div>
                        <div class="col-2 sm-md">
                        <CustomerDropdown setSelectedUser={setSelectedCustomer}/>
                        </div>
                    </div>
                    
                    
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