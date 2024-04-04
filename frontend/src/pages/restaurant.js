import React from "react";
import { useEffect, useState, useContext} from 'react'
import axios from 'axios';
import CardList from '../components/itemList/cardList.component';
import { useLocation, useNavigate, Link } from "react-router-dom";
import CustomerHeader from "../components/CustomerHeader/CustomerHeader.component";
import CustomerDropdown from "../components/CustomerDropdown/CustomerDropdown.component";
import { QueryClient, QueryClientProvider } from "react-query";
import { MyCartContext } from "../Context/MyCartContext";

const queryClient = new QueryClient();
const number = 5;

function Restaurant() {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [cart, setCart] = useState(() => {
      // getting stored value
      const saved = localStorage.getItem("cart");
      //if we have a cart cached then we use that and set it to our context else its empty
      if (saved !== undefined){
        const initialValue = JSON.parse(saved);
        return initialValue || "";
      } else {
        return {};
      }
    });
    //retrieving the restaurant state from the customer page
    const { state: { restaurant } = {} } = useLocation();
    const [items, setItems] = useState([]);
    useEffect(() => {
      const fetchItems = async () => {
        const IdString = restaurant.menu.join(',');
        const url = `http://localhost:65500/items/list?menu=${IdString}`;
        const response = await axios.get(url);
        setItems(response.data.data);
      };
      fetchItems();
    }, []);

    //sets the cart into cache so it can persist page refreshing and backpressing (this makes it accessible even if you go back to customer page)
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // window.addEventListener("popstate", () => {
    //   console.log("YASSSS");
    //   <MyCartContext.Provider value={{ cart, setCart }}>
    //          <Link className="Link" to={`/customer`} state={{ cart, setCart }}></Link>   
    //   </MyCartContext.Provider>
    // });

    useEffect(() => {
      const fetchCustomers = async () => {
        const response = await axios.get("http://localhost:65500/customers");
        setCustomers(response.data.data);
      };
      fetchCustomers();
    }, []);

    //handles when the user clicks add cart on an item
    const handleClick = (item, quantity, restName) => {
      alert("Item Added to Cart!");
      //if the selected customer does not have a cart yet
      if (!cart[selectedCustomer[0]]){
        setCart({...cart, [selectedCustomer[0]]: [{restName: restName, rest_id: item.restID, cust_items: [{item: item, quantity: quantity}]}]}); //good one
        //setCart({...cart, [selectedCustomer[0]]: {[item.restID]: [{item: item, quantity: quantity}]}}); 
      }else {
        const restIndex = cart[selectedCustomer[0]].findIndex(res => res.rest_id === item.restID);
        console.log("restINDEX = " + restIndex);
        //if the selectedcustomer has a cart but not with the current restaurant
        if(restIndex === -1){
          setCart({...cart, [selectedCustomer[0]]: [...cart[selectedCustomer[0]], {restName: restName, rest_id: item.restID, cust_items: [{item: item, quantity: quantity}]}]});
        }
        else {
          const itemIndex = cart[selectedCustomer[0]][restIndex].cust_items.findIndex(m_item => m_item.item === item);
          //if item doesn't exist in the dictionary else
          if (itemIndex === -1){
            const updatedCart = { ...cart };
            updatedCart[selectedCustomer[0]][restIndex].cust_items.push({item: item, quantity: quantity});
            setCart(updatedCart);
            //setCart({...cart, [selectedCustomer[0]]: [...cart[selectedCustomer[0]][restIndex], [...cart[selectedCustomer[0]][restIndex].cust_items, cust_items: [{item: item, quantity: quantity}]]]]});
            //setCart({...cart, [selectedCustomer[0]]: {[item.restID]: [...cart[selectedCustomer[0]][item.restID], {item: item, quantity: quantity}]}});
          } 
          else {
            // Create a copy of the cart
            const updatedCart = { ...cart };

            // Update quantity of duplicate item
            updatedCart[selectedCustomer[0]][restIndex].cust_items[itemIndex].quantity += quantity;

            // Set the updated cart using setCart
            setCart(updatedCart);
          }
        }
      }
    };

    console.log(cart);
    return (
      <QueryClientProvider client={queryClient}>

        <div>
            <head>
                <title>ROPMS Customer Screen</title>
            </head>

            <header>
              <MyCartContext.Provider value={{ cart, setCart }}>
                <CustomerHeader selectedCustomer={selectedCustomer}/>
              </MyCartContext.Provider>
              <CustomerDropdown setSelectedUser={setSelectedCustomer}/>
            </header>

            <body>
              <center>
              <h2>Welcome to {restaurant.name}!</h2>
              <h3>Our Business hours are {restaurant.hours}</h3>
              </center>

              <MyCartContext.Provider value={{ cart, setCart }}>
              <CardList
                    type = {"default"}
                    items = {items}
                    handleClick = {handleClick}
                    restName = {restaurant.name}
                    /> 
            </MyCartContext.Provider>

            </body>
        </div>
      </QueryClientProvider>
    )
}

export default Restaurant;