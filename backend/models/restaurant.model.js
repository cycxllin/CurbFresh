import mongoose from "mongoose";

// no order list as this could potentially get very large
// lookup orders through orders collection by custID instead
const RestaurantSchema = new mongoose.Schema(
    {
        id: {type: Number, required: true},
        name: {type: String, required: true},
        phone: {type: String, required: true},
        menu: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
        active: {type: Boolean, required: true}
      }
);

export default mongoose.model("Restaurant", RestaurantSchema);