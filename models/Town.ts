export {};
const {Schema, model} = require("mongoose");

const schema = new Schema({
  name: {type: String, required: true, unique: true},
  created: {
    type: String,
    default: new Date(),
  },
});

module.exports = model("Town", schema);
