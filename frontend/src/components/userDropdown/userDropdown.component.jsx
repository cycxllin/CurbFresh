import React, { useState } from 'react';
import { useQuery } from "react-query";
import axios from "axios";
import "./UserDropdown.styles.css";

const fetchManagers = async () => {
    const response = await fetch("http://localhost:65500/managers");
    //console.log("OK: " + response.message);
    if (!response.ok) {
        throw new Error("failed to get");
    }
    //console.log("data?: " + response.json().data);
    //console.log("Response!: \n" + response.json());
    return response.json();
}

const fetchCustomers = async () => {
    const response = await axios.get("http://localhost:");
    if (!response.ok){
        throw new Error('failed to get');
    }
    return response.json();
}

function UserDropdown ({ type, setSelectedUser}) {
    const {data: users, isLoading, isError} = useQuery(['users'], fetchManagers);

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error!</p>

    const handleChangeUser = (event) => {
        const user = event.target.value;
        setSelectedUser(user);
    }

    return (
        <select className="form-select">
            <option defaultValue>Choose a manager</option>
            {users.data.map((user,index) => (
            <option key = {index} value={user.id} >{user.fName}</option>
        ))
        }
        </select>
    )
}

export default UserDropdown;
