import mongoose from "mongoose";

// no order list as this could potentially get very large
// lookup orders through orders collection by custID instead
const CustomerSchema = new mongoose.Schema(
    {
        _id: {type: Number, required: true},
        fName: {type: String, required: true},
        lName: {type: String, required: true},
        phone: {type: String, required: true},
        email: String,
      }
);

export default mongoose.model("Customer", CustomerSchema);