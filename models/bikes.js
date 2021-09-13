import mongoose from "mongoose";

const BikeSchema = mongoose.Schema({
  brand: String,
  model: String,
  year: String,
  filename: String,
  image_url: String,
  sitzx: Number,
  sitzy: Number,
  fussx: Number,
  fussy: Number,
  lenkerx: Number,
  lenkery: Number,
  soziussitzx: Number,
  soziussitzy: Number,
  soziusfussx: Number,
  soziusfussy: Number,
});

const Bike = mongoose.model("bike", BikeSchema);

export default Bike;
