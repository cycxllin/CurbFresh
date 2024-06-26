import mongoose from "mongoose";

// no order list as this could potentially get very large
// lookup orders through orders collection by custID instead
const RestaurantSchema = new mongoose.Schema(
    {
      _id: {type: String, required: true},
      name: {type: String, required: true},
      menu: [{type: String, ref: 'Item'}],
      active: {type: Boolean, required: true},
      hours: {type: String, required: true}, // HHMM-HHMM
      image: {type: String},
    }
  );

export default mongoose.model("Restaurant", RestaurantSchema);