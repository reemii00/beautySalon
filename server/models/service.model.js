import mongoose, { Schema } from "mongoose";

const subServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  contentType:{type: String},
  image: { type: String }
});

const servicesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  subServices: [subServiceSchema],
});


export const Services = mongoose.model("Service", servicesSchema);
