import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  phone: string;
  created: string;
}

const schema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  phone: {type: String, required: true, unique: true},
  created: {
    type: String,
    default: new Date(),
  },
});

export default mongoose.model<IUser>("User", schema);
