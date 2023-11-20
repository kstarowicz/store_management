import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi'; 

const router = express.Router();

// Definicja schematów walidacji Joi 

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// Rejestracja użytkownika

router.post('/register', async (req, res) => {
    try {
        // Walidacja danych wejściowych używając Joi 

        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Sprawdzenie, czy użytkownik już istnieje

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Haszowanie hasła
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Tworzenie nowego użytkownika

        const user = new User({ email: req.body.email, password: hashedPassword });
        await user.save();

        // Generowanie JWT

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Logowanie użytkownika

router.post('/login', async (req, res) => {
    try {
        // Walidacja danych wejściowych używając Joi

        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // Sprawdzenie, czy użytkownik istnieje

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        // Weryfikacja hasła

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Generowanie JWT

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "User logged in successfully", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
