import React, { useState } from 'react';
import { useQuery } from "react-query";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import "./UserDropdown.styles.css";

const fetchManagers = async () => {
    //const link = await getLink(type);
    //const url = `http://localhost:65500${link}`;
    //console.log(url);
    const response = await fetch("http://localhost:65500/managers");
    if (!response.ok) {
        throw new Error("failed to get");
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

/*const getLink = async (type) => {
    //To change based on Customer or Manager
    if (type === "Managers") {
        return "/managers";
    }else if (type === "Customers"){
        return "/customers";
    }
}*/

function UserDropdown ({ type, setSelectedUser}) {

    //Query to get array of users
    const {data: users, isLoading, isError} = useQuery(['users'], fetchManagers);

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error!</p>

    const handleChangeUser = (event) => {
        const [userID, resID] = event.target.value;
        //console.log("test: " + user);
        setSelectedUser([userID, resID]);
    }

    return (
        <Form.Select className="form-select" onChange={handleChangeUser}>
            <option defaultValue>Choose a manager</option>
            {users.data.map((user,index) => (
            <option key = {index} value={[user._id, user.restID]} >{user.fName}</option>
        ))
        }
        </Form.Select>
    )
}

export default UserDropdown;
