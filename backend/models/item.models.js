import mongoose from "mongoose";
import { Schema } from "mongoose";

// pickup date/time can be a time or immediate, triggering the retaurant manager to set a time
const OrderSchema = new mongoose.Schema(
    {
        restID: {type: Number, ref: 'Restaurant', required: true},
        name: {type: String, required: true},
        description: {type: String, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        soldOut: Boolean,
      }
);

export default mongoose.model("Order", OrderSchema);