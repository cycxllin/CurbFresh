import React, { useState } from 'react';
import { useQuery } from "react-query";
import CardList from "../cardList/cardList.component";

const fetchMenuItems = async () => {
    //const response = await fetch("https://localhost:65500/");
}


function TabContent ( {type, selectedManager}) {

    const {data: menuItems, isLoading, isError} = useQuery(['menuItems'], fetchMenuItems);
    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error!</p>


    console.log(selectedManager);

    return (
        <div className="content">
            
        </div>
    )
}

export default TabContent;