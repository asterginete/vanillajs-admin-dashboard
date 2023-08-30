const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(401).send('Invalid username or password');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).send('Invalid username or password');

    const token = jwt.sign({ _id: user._id }, 'YOUR_SECRET_KEY'); // Replace 'YOUR_SECRET_KEY' with a real secret key
    res.send(token);
});

// ... other routes like registration ...

module.exports = router;
