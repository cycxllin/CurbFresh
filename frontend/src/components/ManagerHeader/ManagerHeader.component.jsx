import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
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
        staleTime: 60000, //Time the data is stale in milliseconds (1min)
        enabled: !!selectedUser, //Run only if selectedUser is not null
    });

    const [resName, setResName] = useState("Welcome!");
    const [resStartHours, setResStartHours] = useState("");
    const [resEndHours, setResEndHours] = useState("");
    
    useEffect(() => {
        if (isLoading) { setResName("Loading..."); }
        if (isError) { setResName("Error!");}
        if (selectedUser === null || resInfo===undefined) {
            setResName("Select Manager!");
            setResStartHours("");
            setResEndHours("");
        }
        else {
        //console.log(resInfo);
        setResName(resInfo.data[0].name);
        const hours = resInfo.data[0].hours.split("-");
        const startH = hours[0].substring(0,2) + ":" + hours[0].substring(2,4);
        const endH = hours[1].substring(0,2) + ":" + hours[1].substring(2,4);
        //console.log(startH + " " + endH);
        setResStartHours(startH);
        setResEndHours(endH);
        setResInfo(resInfo.data[0]);
        refetch();
    }}, [resInfo, selectedUser, isLoading, isError, refetch, setResInfo]);

    return (
        <header className="mHeader" >
            <a href='http://localhost:3000'>
                <h2>CurbFresh &emsp; {resName}&emsp; Business Hours: {resStartHours}-{resEndHours}</h2> 
            </a>
            
        </header>
    )
}

export default ManagerHeader;
