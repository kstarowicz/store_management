import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors'; // import biblioteki CORS
import Product from './models/Product.js'; 
import User from './models/User.js'; 
import authRoutes from './routes/auth.js';

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to Mongo");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

// Middlewares
app.use(cors()); // Aktywacja middleware CORS
app.use(express.json());

// Dodano  uwierzytelniania
app.use('/auth', authRoutes);

// Endpointy dla produktów paginacja 
app.get('/products', async (req, res) => {
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
      products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Dodawanie nowego produktu
app.post('/products', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Aktualizacja produktu
app.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Usuwanie produktu
app.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware do obsługi błędów
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend on port 8800");
});

///-------------------------------------------------------------------///
//JAK ŚCIĄGNĄĆ ZEWNĘTRZNĄ BAZĘ DANYCH NA ATLASA
// import axios from "axios"

// axios.get(`${process.env.FAKE_STORE_API_URL}`)
//   .then(res => onSuccess(res.data)) // Przekazuj tylko dane z odpowiedzi
//   .catch(err => console.log(err));

// const onSuccess = (products) => {
//   products.forEach(product => { // Użyj forEach do iteracji po tablicy
//     assignDataValue(product); // Przekazuj cały obiekt produktu
//   });
// }

// const assignDataValue = (product) => {
//   let upData = new Product({
//     id: product.id,
//     title: product.title,
//     price: product.price,
//     category: product.category,
//     description: product.description,
//     image: product.image
//   });

//   upData.save().catch(err => console.error(err)); 
// }
///---------------------------------------------------------------------///