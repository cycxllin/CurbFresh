import React, { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import CardList from "../cardList/cardList.component";
import SearchBar from '../searchbar/searchbar.component';

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

function TabContent ( {type, resInfo, selectedManager}) {
    const [menu, setMenuItems] = useState([]);//State for menu items
    const [orders, setOrders] = useState([]);//State for orders

    const [searchInput, setSearchInput] = useState("");//For search input
    const [filteredOrders, setFilteredOrders] = useState([]); //Search filtering states
    const [filteredMenu, setFilteredMenu] = useState([]); //Search filtering states

     //Get Restaurant menu
    const {data: menuItems, isLoading, isError } = useQuery({
        queryKey: ['menuItems', resInfo],
        queryFn: () => fetchMenuItems(resInfo.menu),
        enabled: !!selectedManager || !!resInfo, //Run only if selectedUser or resInfo is not null,
        cacheTime: Infinity,
    });
    //Get Restaurant orders
    const {data: resOrders, loading, error} = useQuery({
        queryKey: ['resOrders', resInfo],
        queryFn: () => fetchResOrders(resInfo._id),
        enabled: !!selectedManager || !!resInfo, //same as above
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
            setOrders(resOrders.data);
            
            //console.log("ORders:" + orders);
        }
        setSearchInput("");
    }, [selectedManager, menuItems, resOrders]);

    //Searchbar input
    const handleInput = e => {
        setSearchInput(e.target.value);
    }
    //Filter search orders and menu items
    useEffect(() => {
        let filteredO = [];
        let filteredI = [];
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
        setFilteredMenu(filteredI); //
    }, [orders, menu, searchInput]);

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
                    placeholder="Search"
                    handleInput={handleInput}
                />
                <CardList key={`${menu}-CardList`} type={type} items={filteredMenu} selectedManager={selectedManager}/>
            </div>
        )
    }else if (type === "Orders"){
        return (
            <div className="content">
                <SearchBar
                    placeholder="Search"
                    handleInput={handleInput}
                />
                <CardList key={`${orders}-CardList`} type={type} items={filteredOrders} selectedManager={selectedManager}/>
            </div>
        )
    }
}

export default TabContent;