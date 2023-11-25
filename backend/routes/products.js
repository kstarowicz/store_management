import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

//Endpointy dla produktów paginacja = GET ALL
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();

    res.json({
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      totalProducts,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET SPECIFIC
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

// Dodawanie nowego produktu
router.post("/", async (req, res) => {
  const product = new Product(req.body);

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Aktualizacja produktu
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Usuwanie produktu
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
