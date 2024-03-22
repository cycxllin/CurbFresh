import React from "react";
import { useEffect, useState } from 'react'
import axios from 'axios';
import CardList from '../components/cardList/cardList.component';

function Customer() {
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
      const fetchRestaurants = async () => {
        const response = await axios.get("http://localhost:65500/restaurants");
        setRestaurants(response.data.data);
      };
  
      fetchRestaurants();
    }, []);

    return (
        <div>
            <head>
                <title>ROPMS Customer Screen</title>
            </head>

            <body>
                {/* console.log({restaurants}); */}
                <CardList
                    restaurants = {restaurants}
                    />
            </body>
        </div>
    )
}

export default Customer;