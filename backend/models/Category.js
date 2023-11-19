import express from 'express';
import Product from './models/Product.js';
// (import innych potrzebnych modułów)

const app = express();
app.use(express.json()); 

// Endpointy dla produktów 
app.get('/products', ...); // Pobieranie produktów


app.post('/products', ...); // Dodawanie nowego produktu
app.put('/products/:id', ...); // Aktualizacja produktu
app.delete('/products/:id', ...); // Usuwanie produktu

// Odpowiedni kod dla każdego endpointu...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Rozkmina 