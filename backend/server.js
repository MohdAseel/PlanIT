const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/IITM_Login')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Login route
app.post('/', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await mongoose.connection.collection('Login').findOne({email, password});
        if (user) {
            res.status(200).json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error occurred while logging in' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

