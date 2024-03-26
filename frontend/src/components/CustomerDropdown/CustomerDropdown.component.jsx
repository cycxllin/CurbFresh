import React from 'react';
import { useQuery } from "react-query";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import "./customerDropdown.styles.css";

const fetchCustomers = async () => {
    const response = await axios.get("http://localhost:65500/customers");
    if (!response.ok){
        throw new Error('failed to get');
    }
    const data = response.json();
}

function UserDropdown ({ type, setSelectedUser}) {

    //Query to get array of users
    const {data: users, refetch} = useQuery(['users'], fetchCustomers);

    const handleChangeUser = (event) => {
        const userID = event.target.value.substring(0,2);
        //console.log("test: " + user);
        setSelectedUser(userID);
    }

    const event = new CustomEvent('test');

    return (
        users
        // <Form.Select className="form-select" onChange={handleChangeUser} event={event}>
        //     <option >Choose a customer</option>
        //     {users.data.map((user,index) => (
        //     <option key = {index} value={[user._id]} >{user.fName}</option>
        // ))
        // }
        // </Form.Select>
    )
}

export default UserDropdown;
