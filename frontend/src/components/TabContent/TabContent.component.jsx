import React, { useState } from 'react';
import { useQuery } from "react-query";
import CardList from "../cardList/cardList.component";


function TabContent ( {type, resInfo}) {
    //const [menuItems, setMenuItems] = useState([]);
    if (resInfo === null) {
        return <p>Select Manager to view restaurant menu!</p>
    }
    console.log(resInfo.menu);
    //setMenuItems(resInfo.menu);
    

    //console.log(selectedManager);

    return (
        <div className="content">
           <CardList restaurants={resInfo.menu}/>
        </div>
    )
}

export default TabContent;