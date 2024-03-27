import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
//import axios from "axios";
import "./ManagerHeader.styles.css";

const fetchRestaurantName = async (rID) => {
    //console.log("ID: " + rID);
    const url = `http://localhost:65500/restaurants/${rID}`
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error fetching restaurant name");
    }
    //const rName = response.json().data.name;
    const data = response.json();
    return data;
}

function ManagerHeader ( { selectedUser, setResInfo} ) {
    const {data: resInfo, isLoading, isError, refetch} = useQuery({
        queryKey: ['resInfo', selectedUser], 
        queryFn: () => selectedUser && fetchRestaurantName(selectedUser[1]), 
        cacheTime: Infinity,
        enabled: !!selectedUser, //Run only if selectedUser is not null
    });

    const [resName, setResName] = useState("Welcome!");
    
    useEffect(() => {
        if (isLoading) { setResName("Loading..."); }
        if (isError) { setResName("Error!");}
        if (selectedUser === null || resInfo===undefined) {setResName("Select Manager!");}
        else {
        //console.log(resInfo);
        setResName(resInfo.data[0].name);
        setResInfo(resInfo.data[0]);
        refetch();
    }}, [resInfo, selectedUser, isLoading, isError, refetch, setResInfo]);

    return (
        <header className="mHeader" >
            <h2>CurbFresh</h2> 
            <h2>{resName}</h2>
        </header>
    )
}

export default ManagerHeader;
