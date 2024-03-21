import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from "axios";
import UserDropdown from '../userDropdown/userDropdown.component';
import "./managerHeader.styles.css";
import Form from 'react-bootstrap/Form';


function managerHeader () {

    return (
        <header className="mHeader">
            <h2>CurbFresh</h2> 
            <h2>Restaurant Name</h2>
            <UserDropdown></UserDropdown>
        </header>
    )
}

export default managerHeader;