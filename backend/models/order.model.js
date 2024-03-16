import mongoose from "mongoose";

// pickup date/time can be a time or immediate, triggering the retaurant manager to set a time
const OrderSchema = new mongoose.Schema(
    {
      _id: {type: String, required: true},
      custID: {type: String, ref: 'Customer', required: true},
      restID: {type: String, ref: 'Restaurant', required: true},
      items: [
        {
          item: {type: String, ref: 'Item', required: true}, 
          quantity: {type: Number, required: true}
        }
      ],
      orderStatus: {type: String, required: true},
      pickupTime: {type: String, required: true}, //HH:MM or "asap"
      price: {type: Number},
      active: {type: Boolean, required: true},
      notes: {type: String},
      created: {type: Date, required: true},
      }
  );

export default mongoose.model("Order", OrderSchema);