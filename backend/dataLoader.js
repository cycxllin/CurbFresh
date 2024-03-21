/**
 * For loading data LOCALLY 
 * Used in developing controllers and route
 * Will eventually be removed when moving data to atlas
 * Does not load managers, items, or orders
 */

import fs from "fs";
import mongoose from "mongoose";
import Restaurant from "./models/restaurant.model.js";
import Customer from "./models/customer.model.js";
import Manager from "./models/manager.model.js";
import Item from "./models/item.model.js";

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL || 
    'mongodb://127.0.0.1/ROPMS', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// Read restaurants.json
fs.readFile('./data/restaurants.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading data file:', err);
    return;
  }
  
  const jsonData = JSON.parse(data);

  // Insert Restaurants
  Restaurant.insertMany(jsonData)
  .then(docs => {
      console.log('Successfully inserted:', docs.length);
  })
  .catch(err => {
      console.error(err);
  })
  
});

//Read customers.json
fs.readFile('./data/customers.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading data file:', err);
        return;
    }

    const jsonData = JSON.parse(data);  

    // Insert customers
  Customer.insertMany(jsonData)
    .then(docs => {
        console.log('Successfully inserted:', docs.length);
    })
    .catch(err => {
        console.error(err);
    })
});

//Read mangers.json
fs.readFile('./data/mangers.json', 'utf8', (err, data) => {
  if (err) {
      console.error('Error reading data file:', err);
      return;
  }

  const jsonData = JSON.parse(data);  

  // Insert managers
Manager.insertMany(jsonData)
  .then(docs => {
      console.log('Successfully inserted:', docs.length);
  })
  .catch(err => {
      console.error(err);
  })
});

//Read item.json
fs.readFile('./data/item.json', 'utf8', (err, data) => {
  if (err) {
      console.error('Error reading data file:', err);
      return;
  }

  const jsonData = JSON.parse(data);  

  // Insert items
Item.insertMany(jsonData)
  .then(docs => {
      console.log('Successfully inserted:', docs.length);
  })
  .catch(err => {
      console.error(err);
  })
});


