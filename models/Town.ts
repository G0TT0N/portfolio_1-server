import mongoose from "mongoose";

interface ITown extends mongoose.Document {
  name: string;
  created: string;
}

const schema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  created: {
    type: String,
    default: new Date(),
  },
});

export default mongoose.model<ITown>("Town", schema);
