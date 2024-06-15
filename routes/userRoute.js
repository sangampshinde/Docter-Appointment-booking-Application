const express = require("express");
const router = express.Router();
const User = require('../models/userModel');//
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/register", async (req,res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if(userExists) {
      return res.status(200).send({message: 'User already exists',success: false}); 
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send({message: 'User saved successfully',success: true});
    
    

  } catch (error) {
     res.status(500).send({message:'error creating user',sucess:false,error});

  }
});

// login page logic 
router.post("/login", async () => {
  try {
    const user= await User.findOne({email:req.body.email});
    // if user not found
    if(!user) {
      return res.status(200).send({message: 'User not found',success: false});
    }

  } catch (error) {

  }
});

module.exports = router;
