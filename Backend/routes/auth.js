import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { createDatabaseForUser } from '../utils/database.js';
import { login } from '../controllers/authController.js';

const jwtSecret = 'your_jwt_secret';

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        // Create database for the new user
        await createDatabaseForUser(newUser._id);

        const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '1h' });
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// Login route
// router.post('/logi', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const existingUser = await User.findOne({ username });
//         if (!existingUser) return res.status(404).json({ message: 'User not found' });

//         const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
//         if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

//         const token = jwt.sign({ id: existingUser._id }, jwtSecret, { expiresIn: '1h' });
//         res.status(200).json({ token, user: existingUser });
//     } catch (error) {
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// });

router.post('/login', login);

export default router;
