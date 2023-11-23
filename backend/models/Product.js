import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    prices: [{
      company: String, 
      price: { type: Number, min: 0 }
    }],
  },
  { timestamps: true }
);

ProductSchema.index({ name: 1 }); // Indeksowanie według nazwy

export default mongoose.model("Product", ProductSchema);
