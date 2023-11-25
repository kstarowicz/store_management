import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

CategorySchema.index({ name: 1 }); // Indeksowanie według nazwy

export default mongoose.model("Category", CategorySchema);
