import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
    {
      _id: {type: String, required: true},
      restID: {type: String, ref: 'Restaurant', required: true},
      name: {type: String, required: true},
      description: {type: String, required: true},
      image: {type: String},
      price: {type: Number, required: true},
      soldOut: {type: Boolean, required: true},
      active: {type: Boolean, required: true},
      category: {
        type: String, 
        required: true, 
        enum: ["Starters", "Specials", "Salads", "Soups", "Handhelds", "Mains",
            "Sides", "Desserts", "Drinks", "Other"]
      }
    }
  );

const Item =  mongoose.model("Item", ItemSchema);

export default Item;