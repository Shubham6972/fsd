const express = require('express');
const User = require('../models/userLogin')
const jwt = require('jsonwebtoken'); 
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from User Routes');
});

router.post('/register', async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newUser = new User({
      name,
      password
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: 'Name and password are required' });
    }

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(401).json({ error: 'Invalid name or password' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid name or password' });
    }


    const payload = {
      user_id: user._id,
      name: user.name,
      password: user.password,
    };

    const token = jwt.sign(payload, 'Shubhu@2003', { expiresIn: 5000 });

    res.status(200).json({ Login: true, token, data: user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;