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
        const IdString = restaurant.menu.join(',');
        const url = `http://localhost:65500/items/list?menu=${IdString}`;
        const response = await axios.get(url);
        setItems(response.data.data);
      };
  
      fetchItems();
    }, []);

  //console.log(items);

    return (
        <div>
            <head>
                <title>ROPMS Customer Screen</title>
            </head>

            <body>
              <center>
              <h2>Welcome to {restaurant.name}!</h2>
              <h3>Our Business hours are 9am - 10pm.</h3>
              {restaurant.menu}
              </center>

            <CardList
                    items = {items}
                    />

            </body>
        </div>
    )
}

export default Restaurant;