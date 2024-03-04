import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import customerRoutes from "./routes/customer.route.js";
import restaurantRoutes from "./routes/restaurant.route.js";

import { connectDB } from "./database/database.js";

const app = express();

const port = process.env.PORT || 65500;

connectDB();

// parse url & json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// allow CORS 
app.use(cors());

// routes
app.use("/customers", customerRoutes);
app.use("/restaurants", restaurantRoutes);

//start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});