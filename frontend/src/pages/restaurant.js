import React from "react";
import { useEffect, useState } from 'react'
import axios from 'axios';
import CardList from '../components/itemList/cardList.component';
import { useLocation, useNavigate } from "react-router-dom";

function Restaurant() {
    const { state: { restaurant } = {} } = useLocation();
    const [items, setItems] = useState([]);
    useEffect(() => {
      const fetchItems = async () => {
        const url = "http://localhost:65500/items";
        const config = {'restID': 'R1'};
        const response = await axios.get(url, config);
        setItems(response.data.data);
      };
  
      fetchItems();
    }, []);

    console.log(items);
    return (
        <div>
            <head>
                <title>ROPMS Customer Screen</title>
            </head>

            <body>
              <h1>Welcome to {restaurant.name}!!!</h1>
            <CardList
                    items = {items}
                    />

            </body>
        </div>
    )
}

export default Restaurant;