import React from 'react';
import { useQuery } from "react-query";
import Form from 'react-bootstrap/Form';
import "./UserDropdown.styles.css";

const fetchManagers = async () => {
    const response = await fetch("http://localhost:65500/managers");
    if (!response.ok) {
        throw new Error("failed to get");
    }
    return response.json();
}

function UserDropdown ({ setSelectedUser}) {

    //Query to get array of users
    const {data: users, isLoading, isError} = useQuery({
        queryKey: ['users'], 
        queryFn: fetchManagers,
        enabled: !!setSelectedUser,
        staleTime: 300000, //Time the data is stale in milliseconds (5min)
        cacheTime: Infinity,
    });

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error!</p>

    //Handles the user change
    const handleChangeUser = (event) => {
        if (event.target.value === "Choose a manager"){//Set back to no user
            setSelectedUser(null);
            return;
        }
        const userID = event.target.value.substring(0,2);
        const resID = event.target.value.substring(3,5);
        //Setting the user
        setSelectedUser([userID, resID]);
    }

    return (
        <Form.Select className="form-select" onChange={handleChangeUser} >
            <option >Choose a manager</option>
            {users.data.map((user,index) => (
            <option key = {index} value={[user._id, user.restID]} >{user.fName}</option>
        ))
        }
        </Form.Select>
    )
}

export default UserDropdown;
