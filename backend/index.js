import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; // import biblioteki CORS
import authRoutes from "./routes/auth.js";
import productsRoutes from "./routes/Products.js";
import categoriesRoutes from "./routes/categories.js";

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

//REST ROUTES
// Dodano  uwierzytelniania
app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/categories", categoriesRoutes);

// Middleware do obsługi błędów
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
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