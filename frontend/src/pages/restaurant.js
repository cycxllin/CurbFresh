import React from "react";
import { useEffect, useState, useContext} from 'react'
import axios from 'axios';
import CardList from '../components/itemList/cardList.component';
import { useLocation, useNavigate, Link } from "react-router-dom";
import CustomerHeader from "../components/CustomerHeader/CustomerHeader.component";
import SearchBar from "../components/searchbar/searchbar.component";
import Form from 'react-bootstrap/Form';
import CustomerDropdown from "../components/CustomerDropdown/CustomerDropdown.component";
import { QueryClient, QueryClientProvider } from "react-query";
import { MyCartContext } from "../Context/MyCartContext";
import "./restaurant.styles.css";

const queryClient = new QueryClient();
const number = 5;

function Restaurant() {
    const [searchInput, setSearchInput] = useState("");//For search input
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [filterI, setFilterI] = useState(""); //Search filtering menu states 
    const [filteredItems, setFilteredItems] = useState([]); //Search filtering states
    const [categories, setCategories] = useState([]); //
    const [cart, setCart] = useState(() => {
      // getting stored cart
      const savedCart = localStorage.getItem("cart");
      //if we have a cart cached then we use that and set it to our context else its empty
      if (savedCart !== undefined){
        const initialValue = JSON.parse(savedCart);
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
        const allItems = response.data.data;
        let placeholderItems =[];
        for (var value of allItems) {
          if (value.soldOut !== true || value.soldOut !== false) {
            placeholderItems.push(value);
          }
        }
        setItems(placeholderItems);
      };
      fetchItems();
    }, []);

    //gets categories of the current menu items
    useEffect(() => {
      const fetchCategories = async () => {
        let set = new Set();
        let temp = [];
        for (let i = 0; i < items.length; i++){
          set.add(items[i].category);
        }
        for (const category of set) {
          temp.push({value: category, text: category});
        }
        console.log(temp);
        setCategories(temp);
      };
  
      fetchCategories();
    }, [items]);

    //setting selected customer into cache to save what customer has been selected
    useEffect(() => {
      localStorage.setItem('customer', JSON.stringify(selectedCustomer));
    }, [selectedCustomer]);

    //sets the cart into cache so it can persist page refreshing and backpressing (this makes it accessible even if you go back to customer page)
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    //Searchbar input
    const handleInput = e => {
      setSearchInput(e.target.value);
    }

    //Search menu items
    let filteredI = []; //Used in searchbar and filters
    //useEffect for searchbar
    useEffect(() => {
        if (searchInput === ""){
            filteredI = items;
        } else {
            filteredI = items.filter(item =>
                item.name.toLowerCase().includes(searchInput.toLowerCase()
                ));
        }
        setFilteredItems(filteredI); 
    }, [items, searchInput]);

    //Handle select filter searching
    const handleChange = (event) => {
      const filterCategory = event.target.value;
      if (filterCategory !== "none") {
          filteredI = items.filter(item => 
              item.category.includes(filterCategory));
      } else {
          filteredI = items;
      }
      setFilteredItems(filteredI); 
      setFilterI(filterCategory);
  }

    useEffect(() => {
      const fetchCustomers = async () => {
        const response = await axios.get("http://localhost:65500/customers");
        setCustomers(response.data.data);
      };
      fetchCustomers();
    }, []);

    //handles when the user clicks add cart on an item
    //type denotes what type of click was registered, there are three types adding an item to cart, updating and deleting
    const handleClick = (item, quantity, restName) => {
        if (selectedCustomer === null){
          alert("Please select a customer!");
        }
        else {
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
        }
    };
    return (
      <QueryClientProvider client={queryClient}>

        <div class="Restaurant">
          <head>
                <title>ROPMS Customer Screen</title>
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
              <center>
              <h2>Welcome to {restaurant.name}!</h2>
              <h3>Our Business hours are {restaurant.hours}</h3>

              <SearchBar
                    placeholder="Search Item Name"
                    handleInput={handleInput}
                />

              <Form.Group className="mb-4">
                    <Form.Label>Item Filter: </Form.Label>
                    <Form.Control 
                    as="select" 
                    name="category"
                    value={filterI}
                    onChange={handleChange}
                    >
                      <option value="none" selected={true}>All</option>
                    {categories.map(category => (
                            <option value={category.value}>{category.text}</option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">Select a category</Form.Control.Feedback>
                </Form.Group>
              </center>

              <MyCartContext.Provider value={{ cart, setCart }}>
              <CardList
                    type = {"default"}
                    items = {filteredItems}
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