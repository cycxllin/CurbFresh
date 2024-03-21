import React from 'react';
import {useQuery} from "react-query";
//import "./userDropdown.styles.css";

const fetchManagers = async () => {
    const response = await axios.get("http://localhost:");
}

function userDropdown ({ type, setSelectedUser}) {
    if (type === "Manager"){
        const { data: managers, isLoading, isError} = useQuery('getManagers', fetchManagers);
    } else if (type === "Customer") {

    }

    return (
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
            </button>
            <ul class="dropdown-menu">
                <li><button class="dropdown-item" type="button">Action</button></li>
                <li><button class="dropdown-item" type="button">Another action</button></li>
                <li><button class="dropdown-item" type="button">Something else here</button></li>
            </ul>
        </div>
    )
}

export default userDropdown;
