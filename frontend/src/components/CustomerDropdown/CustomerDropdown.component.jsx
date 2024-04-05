import React from 'react';
import { useQuery } from "react-query";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import "./CustomerDropdown.styles.css";

const fetchCustomers = async () => {
    const response = await fetch("http://localhost:65500/customers");
    if (!response.ok) {
        throw new Error("failed to get");
    }
    return response.json();
}

function CustomerDropdown ({ type, setSelectedUser}) {
    //Query to get array of users
    //Query to get array of users
    const {data: users, isLoading, isError, refetch} = useQuery({
        queryKey: ['users'], 
        queryFn: fetchCustomers,
        enabled: !!setSelectedUser,
        staleTime: 300000, //Time the data is stale in milliseconds (5min)
        cacheTime: Infinity,
    });

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error!</p>

    const handleChangeUser = (event) => {
        if (event.target.value === "Choose a customer"){//Set back to no user
            setSelectedUser(null);
            return;
        }
        const userID = event.target.value.substring(0,2);
        setSelectedUser([userID]);

    }

    //const event = new CustomEvent('test');

    return (
        <Form.Select className="form-select" onChange={handleChangeUser}>
            <option >Choose a customer</option>
            {users.data.map((user,index) => (
            <option key = {index} value={[user._id]} >{user.fName}</option>
        ))
        }
        </Form.Select>
    )
}

export default CustomerDropdown;
