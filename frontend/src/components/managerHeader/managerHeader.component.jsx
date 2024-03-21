import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from "axios";
import UserDropdown from '../UserDropdown/UserDropdown.component';
import "./managerHeader.styles.css";


function managerHeader ( {setSelectedUser} ) {

    return (
        <header className="mHeader">
            <h2>CurbFresh</h2> 
            <h2>Restaurant Name</h2>
            <UserDropdown setSelectedUser={setSelectedUser} type="Managers"></UserDropdown>
        </header>
    )
}

export default managerHeader;