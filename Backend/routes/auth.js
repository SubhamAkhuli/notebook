const express = require('express');
const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { set } = require('mongoose');

// create a user using: POST /api/auth/createuser no login required
router.post('/createuser',
  //validation for name,email and password
  [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email-id').isEmail(),
    body('password', 'Password must be atleast 4 characters').isLength({ min: 4 })
  ], async (req, res) => {

    // check for errors in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {

      // check if the user with this email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" });
      }

      // hash the password
      // generate a salt with 10 rounds
      const salt = await bcrypt.genSalt(10);
      // hash the password with the salt
      const secPass = await bcrypt.hash(req.body.password, salt);
      
      // create a new user with the name, email and password provided
      user = await User.create({ name: req.body.name, email: req.body.email, password: secPass });
      res.send(user);
    } catch (error) {
      // error handling
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  });

module.exports = router;