import mongoose from "mongoose";
import { Schema } from "mongoose";

const ItemSchema = new mongoose.Schema(
    {
        restID: {type: Number, ref: 'Restaurant', required: true},
        name: {type: String, required: true},
        description: {type: String, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        soldOut: Boolean,
      }
);

const Item =  mongoose.model("Item", ItemSchema);

export default Item;