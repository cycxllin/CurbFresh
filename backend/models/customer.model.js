import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
    {
        fName: {type: String, required: true},
        lName: {type: String, required: true},
        phone: {type: String, required: true, unique: true},
        email: String,
      }
);

export default mongoose.model("Customer", CustomerSchema);