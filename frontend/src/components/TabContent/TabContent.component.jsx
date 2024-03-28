import React, { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import CardList from "../cardList/cardList.component";
import SearchBar from '../searchbar/searchbar.component';
import Form from 'react-bootstrap/Form';

const fetchResOrders = async (resID) => {
    if (resID === undefined){
        return;
    }
    const url = `http://localhost:65500/orders/restaurant/${resID}`;
    //console.log("Order url: " + url);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch menu items");
    }
    return response.json();
}

const fetchMenuItems = async (menuIDs) => {
    if (menuIDs === undefined) {
        return;
    }
    const IdString = menuIDs.join(',');
    //console.log(IdString);
    const url = `http://localhost:65500/items/list?menu=${IdString}`;
    //console.log(url);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch menu items");
    }
    return response.json();
}

//Comparison function to sort orders based on orderStatus
function compareOrderStatus(orderA, orderB) {
    const statusOrder = ["placed", "in progress", "awaiting pickup", "completed", "canceled"];
    //console.log("Test: " + statusOrder.findIndex("in progress"));
    const a = statusOrder.indexOf(orderA.orderStatus);
    const b = statusOrder.indexOf(orderB.orderStatus);
    if (a < b ){
        return -1;
    } else if ( a > b ){
        return 1;
    }
    //Otherwise equal
    return 0;
}

function TabContent ( {type, resInfo, selectedManager}) {
    const [menu, setMenuItems] = useState([]);//State for menu items
    const [orders, setOrders] = useState([]);//State for orders

    const [searchInput, setSearchInput] = useState("");//For search input
    const [filteredOrders, setFilteredOrders] = useState([]); //Search filtering states
    const [filteredMenu, setFilteredMenu] = useState([]); //Search filtering states
    const [filterM, setFilterM] = useState(""); //Search filtering menu states 
    const [filterO, setFilterO] = useState(""); //Search filtering orderStatus states

     //Get Restaurant menu
    const {data: menuItems, isLoading, isError } = useQuery({
        queryKey: ['menuItems', resInfo],
        queryFn: () => fetchMenuItems(resInfo.menu),
        enabled: !!selectedManager || !!resInfo, //Run only if selectedUser or resInfo is not null,
        staleTime: 3000, //Time the data is stale in milliseconds (3sec)
        cacheTime: Infinity,
    });
    //Get Restaurant orders
    const {data: resOrders, loading, error} = useQuery({
        queryKey: ['resOrders', resInfo],
        queryFn: () => fetchResOrders(resInfo._id),
        enabled: !!selectedManager || !!resInfo, //same as above
        staleTime: 3000, //Time the data is stale in milliseconds (3sec)
        cacheTime: Infinity,
    });

    //Setting inital values of menu and orders
    useEffect(() =>{
        if (menuItems && selectedManager) {
            //console.log("type: " + typeof menuItems.data);
            setMenuItems(menuItems.data);
            //setSearchInput("");
            //console.log("Menu? " + menu );
        }
        if (resOrders && selectedManager){
            resOrders.data.sort(compareOrderStatus);
            setOrders(resOrders.data);
            
            //console.log("ORders:" + orders);
        }
        setSearchInput("");
        setFilterM("");
        setFilterO("");
    }, [selectedManager, menuItems, resOrders]);

    //Searchbar input
    const handleInput = e => {
        setSearchInput(e.target.value);
    }
    //Filter search orders and menu items
    let filteredI = []; //Used in searchbar and filters
    let filteredO = []; //Used in searchbar and filters
    useEffect(() => {
        if (searchInput === ""){
            filteredO = orders;
            filteredI = menu;
        } else {
            filteredO = orders.filter(order => 
                order._id.toLowerCase().includes(searchInput.toLowerCase()));
            filteredI = menu.filter(item =>
                item.name.toLowerCase().includes(searchInput.toLowerCase()
                ));
        }
        setFilteredOrders(filteredO);
        setFilteredMenu(filteredI); 
    }, [orders, menu, searchInput]);

    //Handle filter searching
    const handleChange = (event) => {
        const filterCategory = event.target.value;
        if (filterCategory != "none") {
            filteredI = menu.filter(item => 
                item.category.includes(filterCategory));
            filteredO = orders.filter(order =>
                order.orderStatus.includes(filterCategory))
        } else {
            filteredI = menu;
            filteredO = orders;
        }
        setFilteredMenu(filteredI); 
        setFilterM(filterCategory);
        setFilteredOrders(filteredO);
        setFilterO(filterCategory);
    }

    if (isLoading || loading) {
        return <p>Loading...</p>}
    if (isError || error) {return console.log(isError);}
    if (resInfo === null || selectedManager === null){
        return <p>Select Manager to view restaurant info!</p> 
    }
    //TODO Add other tabContents, split menu into categories
    if (type === "Menu Items"){
        return (
            <div className="content">
                <SearchBar
                    placeholder="Search Item Name"
                    handleInput={handleInput}
                />

                <Form.Group className="mb-4">
                    <Form.Label>Item Filter: </Form.Label>
                    <Form.Control 
                    as="select" 
                    name="category"
                    value={filterM}
                    onChange={handleChange}
                    >
                    <option value="none" selected={true}>Select a category</option>
                    <option value="Starters">Starters</option>
                    <option value="Specials">Specials</option>
                    <option value="Salads">Salads</option>
                    <option value="Soups">Soups</option>
                    <option value="Handhelds">Handhelds</option>
                    <option value="Mains">Mains</option>
                    <option value="Sides">Sides</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Other">Other</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">Select a category</Form.Control.Feedback>
                </Form.Group>

                <CardList key={`${menu}-CardList`} type={type} items={filteredMenu} selectedManager={selectedManager}/>
            </div>
        )
    }else if (type === "Orders"){
        return (
            <div className="content">
                <SearchBar
                    placeholder="Search Order ID"
                    handleInput={handleInput}
                />

                <Form.Group className="mb-4">
                    <Form.Label>Order Status Filter: </Form.Label>
                    <Form.Control 
                    as="select" 
                    name="category"
                    value={filterO}
                    onChange={handleChange}
                    >
                    <option value="none" selected={true}>Select Order Status</option>
                    <option value="placed">Ordered</option>
                    <option value="in progress">In Progress</option>
                    <option value="awaiting pickup">Awaiting Pickup</option>
                    <option value="completed">completed</option>
                    <option value="canceled">canceled</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">Select a category</Form.Control.Feedback>
                </Form.Group>

                <CardList key={`${orders}-CardList`} type={type} items={filteredOrders} selectedManager={selectedManager}/>
            </div>
        )
    }
}

export default TabContent;