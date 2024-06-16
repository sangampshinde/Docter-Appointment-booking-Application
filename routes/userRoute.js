const express = require("express");
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(200).send({ message: 'User already exists', success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send({ message: 'User saved successfully', success: true });

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error creating user', success: false, error });

  }
});

// Login logic
router.post("/login", async (req, res) => {
  console.log(req.body.email);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: 'User not found', success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({ message: 'Invalid password', success: false });
    } else {
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "1h"
      });
      res.status(200).send({ message: 'User logged in successfully', success: true, data: token });
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in login", success: false, error: error });

  }
});

// Protected routes
router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({ message: 'User not found', success: false });
    } else {
      return res.status(200).send({ success: true, data: { user: user.name, email: user.email } });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error while getting user info', success: false, error });

  }
});

module.exports = router;
