import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      require: true, index:true, unique:true,sparse:true,
      unique: true
    },
    title: {
      type: String,
      // required: true,
      // unique: true
    },
    price: {
      type: Number,
    },
    category: {
      type: String
    },
    description: {
      type: String,
    },
    image: {
      type: String
    }
  },
  { timestamps: true }
);

ProductSchema.index({ name: 1 }); // Indeksowanie według nazwy

export default mongoose.model("Product", ProductSchema);
