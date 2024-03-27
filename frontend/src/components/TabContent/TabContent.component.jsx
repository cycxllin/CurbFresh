import React, { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import CardList from "../cardList/cardList.component";
//import SearchBar from '../searchbar/searchbar.component';

const fetchMenuItems = async (menuIDs) => {
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
    const [menu, setMenuItems] = useState([]);
    
    const {data: menuItems, isLoading, isError, refetch } = useQuery({
        queryKey: ['menuItems', resInfo],
        queryFn: () => fetchMenuItems(resInfo.menu),
        enabled: !!selectedManager || !!resInfo, //Run only if selectedUser or resInfo is not null,
        cacheTime: Infinity,
    });
    useEffect(() =>{
        if (menuItems && selectedManager) {
            //refetch();
            //console.log("type: " + typeof menuItems.data);
            setMenuItems(menuItems.data);
            //updateRefreshKey();
            //console.log("Menu? " + menu );
        }
    }, [selectedManager, menuItems]);
    if (isLoading) {
        return <p>Loading...</p>}
    if (isError) {return console.log(isError);}
    if (resInfo === null || selectedManager === null){
        return <p>Select Manager to view restaurant menu!</p> 
    }
    //console.log(resInfo.menu);

    //console.log(selectedManager);

    //TODO Add other tabContents
    //Add search to menuItems
    if (type === "Menu Items"){
        return (
            <div className="content">
                <CardList key={`${menu}-CardList`} items={menu} selectedManager={selectedManager}/>
            </div>
        )
    }
}

export default TabContent;