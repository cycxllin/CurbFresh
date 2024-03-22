import React from "react";
import { useEffect, useState } from 'react'
import axios from 'axios';
import CardList from '../components/cardList/cardList.component';
import { useLocation, useNavigate } from "react-router-dom";

function Restaurant() {
    const { state: { restaurant } = {} } = useLocation();
    //console.log(restaurant);
    return (
        <div>
            <head>
                <title>ROPMS Customer Screen</title>
            </head>

            <body>
                {/* console.log({restaurants}); */}
                <h1>{restaurant.name}</h1>
            </body>
        </div>
    )
}

export default Restaurant;