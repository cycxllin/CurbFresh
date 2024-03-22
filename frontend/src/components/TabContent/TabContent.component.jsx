import React, { useState } from 'react';
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

    const {data: menuItems, isLoading, isError, refetch} = useQuery('menuItems', () => fetchMenuItems(resInfo.menu));

    if (resInfo === null) {
        return <p>Select Manager to view restaurant menu!</p>
    }
    if (isError) {return <p>Error!</p>}
    if (isLoading) {return <p>Loading...</p>}
    //console.log(resInfo.menu);

    //console.log(selectedManager);

    //TODO Add other tabContents
    //Add search to menuItems
    if (type === "Menu Items"){
        return (
            <div className="content">
                <CardList items={menuItems.data} selectedManager={selectedManager}/>
            </div>
        )
    }
}

export default TabContent;