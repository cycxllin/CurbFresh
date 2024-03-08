import mongoose from "mongoose";

// pickup date/time can be a time or immediate, triggering the retaurant manager to set a time
const OrderSchema = new mongoose.Schema(
    {
        id: {type: Number, required: true},
        custID: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
        restID: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true},
        items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
        orderStatus: {type: String, required: true},
        pickupTime: {type: String, required: true},
        price: Number,
        active: {type: Boolean, required: true},
      }
);

export default mongoose.model("Order", OrderSchema);