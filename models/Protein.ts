import mongoose from "mongoose";

interface ISpecification {
  weight: string;
  taste: string;
  portion: string;
  form: string;
  detail: Array<{component: string; value: string}>; // protein: 20gr, ...
}

interface IRemainder {
  town: string;
  quantity: string;
}

interface IProtein extends mongoose.Document {
  name: string;
  img: string[];
  price: string;
  brend: string;
  country: string;
  description: string;
  specifications: Array<ISpecification>;
  rating: string;
  remainder: Array<IRemainder>;
  reviews?: string[]; // array Reviews ids
  created: string;
}

const schema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  img: {type: Array, required: true},
  price: {type: String, required: true},
  brend: {type: String, required: true},
  country: {type: String, required: true},
  description: {type: String, required: true},
  specifications: {type: Array, required: true},
  rating: {type: String, required: true},
  remainder: {type: Array, required: true},
  reviews: {type: Array},
  created: {
    type: String,
    default: new Date(),
  },
});

export default mongoose.model<IProtein>("Protein", schema);
