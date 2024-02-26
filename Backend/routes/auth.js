const express = require('express');
const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

// create a variable JWT_SECRET and assign it a secret key
 const JWT_SECRET ="mynameissubhamandiamagoodboy"; 


//  set success to false and send the error message in the response
let success = false;


// Route:1 create a user using: POST /api/auth/createuser no login required
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
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {

      // check if the user with this email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success,error: "Sorry a user with this email already exists" });
      }

      // hash the password
      // generate a salt with 10 rounds
      const salt = await bcrypt.genSalt(10);
      // hash the password with the salt
      const secPass = await bcrypt.hash(req.body.password, salt);

      // create a new user with the name, email and password provided
      user = await User.create({ name: req.body.name, email: req.body.email, password: secPass });

      // jwt token generation for the user
      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);

      // set success to true
      success = true;
      // send the auth token in the response
      res.json({ success,authToken });
    } catch (error) {
      // error handling
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  });




  // Route:2 authenticate a user using: POST /api/auth/login no login required
router.post('/login', [

  // validation for email and password
  body('email', 'Enter a valid Email-id').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {

  // check for errors in the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }

  // destructure the request body and get the email and password
  const { email, password } = req.body;
  try {

    // check if the user with this email exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success,error: "Please try to login with correct credentials" });
    }

    // check if the password matches
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success,error: "Please try to login with correct credentials" });
    }
    // jwt token generation for the user
    const data = {
      user: {
        id: user.id
      }
    }
    // sign the jwt token
    const authToken = jwt.sign(data, JWT_SECRET);
    // set success to true and send the auth token in the response
    success = true;
    res.json({ success,authToken });
  } catch (error) {
    // error handling
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});



// Route:3 get loggedin user details using: POST "/api/auth/getuser" no login required
router.post('/getuser', fetchuser , async (req, res) => {
  try {
    // find the user by id and return the user details excluding the password
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    // error handling
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;