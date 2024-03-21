import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from "axios";
import "./userDropdown.styles.css";

const fetchManagers = async () => {
    const response = await axios.get("http://localhost:");
    if (!response.ok){
        throw new Error('failed to get');
    }
    return response.json();
}

const fetchCustomers = async () => {
    const response = await axios.get("http://localhost:");
    if (!response.ok){
        throw new Error('failed to get');
    }
    return response.json();
}

function userDropdown ({ type, setSelectedUser}) {
    let users;
    //const data = { data: users, isLoading, isError};
    if (type === "Manager"){
        //data = useQuery('getManagers', fetchManagers);
    } else if (type === "Customer") {
        //data = useQuery('getCustomer', fetchCustomers);
    }

    //if (isLoading) return <p>Loading...</p>
    //if (isError) return <p>Error!</p>

    const handleChangeUser = (event) => {
        const user = event.target.value;
        setSelectedUser(user);
    }

    return (
        <select class="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
    )
}

export default userDropdown;
