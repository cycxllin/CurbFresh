import React, { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import CardList from "../cardList/cardList.component";
//import SearchBar from '../searchbar/searchbar.component';

const fetchResOrders = async (resID) => {
    if (resID === undefined){
        return;
    }
    const url = `http://localhost:65500/orders/restaurant/${resID}`;
    console.log("Order url: " + url);
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
    //const [filteredItems, setFilteredItems] = useState([]);
    //const [searchInput, setSearchInput] = useState("");

    const [menu, setMenuItems] = useState([]);//State for menu items
    const [orders, setOrders] = useState([]);//State for orders
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

    useEffect(() =>{
        if (menuItems && selectedManager) {
            //console.log("type: " + typeof menuItems.data);
            setMenuItems(menuItems.data);
            //console.log("Menu? " + menu );
        }
        if (resOrders && selectedManager){
            setOrders(resOrders.data);
            //console.log("ORders:" + orders.length);
        }
    }, [selectedManager, menuItems, resOrders]);

    if (isLoading || loading) {
        return <p>Loading...</p>}
    if (isError || error) {return console.log(isError);}
    if (resInfo === null || selectedManager === null){
        return <p>Select Manager to view restaurant info!</p> 
    }

    //TODO Add other tabContents
    //Add search to menuItems
    if (type === "Menu Items"){
        return (
            <div className="content">
                <CardList key={`${menu}-CardList`} type={type} items={menu} selectedManager={selectedManager}/>
            </div>
        )
    }else if (type === "Orders"){
        return (
            <div className="content">
                <CardList key={`${orders}-CardList`} type={type} items={orders} selectedManager={selectedManager}/>
            </div>
        )
    }
}

export default TabContent;