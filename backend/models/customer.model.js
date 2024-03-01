import mongoose from "mongoose";

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