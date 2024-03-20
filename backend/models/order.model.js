import mongoose from "mongoose";

// pickup time can be asap or a 24hr time as HH:MM
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
      orderStatus: {
        type: String, 
        required: true,
        enum: ["placed", "in progress", "awaiting pickup", "completed", "canceled"]
      },
      pickupTime: {type: String, required: true},
      price: {type: Number},
      active: {type: Boolean, required: true},
      notes: {type: String, maxlength: 256},
      created: {type: Date, required: true},
      }
  );

export default mongoose.model("Order", OrderSchema);