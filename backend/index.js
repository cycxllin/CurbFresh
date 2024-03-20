import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import customerRoutes from "./routes/customer.route.js";
import managerRoutes from "./routes/manager.route.js";
import itemRoutes from "./routes/item.route.js";
import orderRoutes from "./routes/order.route.js";
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
app.use("/managers", managerRoutes);
app.use("/items", itemRoutes);
app.use("/orders", orderRoutes);
app.use("/restaurants", restaurantRoutes);

//start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
