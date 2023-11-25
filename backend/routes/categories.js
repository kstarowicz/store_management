import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

// Endpointy dla kategorii

// Pobieranie kategorii
//GET ALL
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find()

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET SPECIFIC
router.get("/:id", async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
});

// Dodawanie nowej kategorii
router.post("/", async (req, res) => {
  const category = new Category(req.body);

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Aktualizacja kategorii
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Usuwanie kategorii
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
