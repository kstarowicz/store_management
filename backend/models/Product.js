import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    prices: [{ company: String, price: Number }],
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);