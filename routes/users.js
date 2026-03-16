var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const verify = require('./../middlewares/verifyJWT');

router.get('/', verify, function (req, res, next) {
  res.send('respond with a resource');
});

// LOGIN USER
router.post('/login', async (req, res) => {
  try {
    // 1. Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid password");
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 3600000
    }).send({ message: "Login successful" });
  } catch (err) {
    res.status(500).send("Error logging in");
  }
});

router.post('/register', async (req, res) => {
  try {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({
      email: data.email,
      password: hashedPassword,
      age: new Date(data.age),
      gender: data.gender,
      disease: data.disease,
      name: data.name,
      phone: data.phone
    });
    await user.save();
    res.status(201).send("You are registered successfully!");
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send("Error registering user");
  }
});

module.exports = router;
