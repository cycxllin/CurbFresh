import mongoose from "mongoose";

const ManagerSchema = new mongoose.Schema(
    {
      _id: {type: String, required: true},
      restID: {type: String, ref: 'Restaurant', required: true},
      fName: {type: String, required: true},
      lName: {type: String, required: true},
      phone: {type: String, required: true},
      active: {type: Boolean, required: true},
      email: {type: String}
    }
  );

export default mongoose.model("Manager", ManagerSchema);