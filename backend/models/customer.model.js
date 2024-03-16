import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
    {
      _id: {type: String, required: true},
      fName: {type: String, required: true},
      lName: {type: String, required: true},
      phone: {type: String, required: true, unique: true},
      active: {type: Boolean, required: true},
      email: {type: String}
    }
  );

export default mongoose.model("Customer", CustomerSchema);