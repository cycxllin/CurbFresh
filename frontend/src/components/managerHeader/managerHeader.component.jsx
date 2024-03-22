import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from "axios";
import UserDropdown from '../userDropdown/userDropdown.component';
import "./managerHeader.styles.css";

const fetchRestaurantName = async (user) => {
    const id = user[1];
    console.log("ID: " + id);
    /*const url = `http://localhost:65500/restaurants/${id}`
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error fetching restaurant name");
    }

    return response.json();*/
}

function ManagerHeader ( { selectedUser, setSelectedUser} ) {
    let resName = "TEST";
    if (selectedUser != null) {
        console.log("select: " + selectedUser[0]);
    }
    
    /*const {data: resName, isLoading, isError, refetch} = useQuery('resName', fetchRestaurantName(setSelectedUser));
    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error!</p>*/

    return (
        <header className="mHeader">
            <h2>CurbFresh</h2> 
            <h2>{resName}</h2>
            <UserDropdown setSelectedUser={setSelectedUser} type="Managers"></UserDropdown>
        </header>
    )
}

export default ManagerHeader;