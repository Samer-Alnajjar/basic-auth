"use strict"

// Importing packages and files

const user = require("../auth/models/users-model.js");
const bcrypt = require("bcrypt");


async function signup(req, res, next) {
  try {
    // req.body.password = await bcrypt.hash(req.body.password, 10);
    // const user = new Users(req.body);
    // const record = await user.save(req.body);
    // res.status(200).json(record);
    const record = await user.create(req.body)
    res.status(200).json(record);
  } catch (e) {
    //  res.status(403).send("Error Creating User"); 
    // next(e);
    next("Invalid Input");
  }
}


async function signin(req, res, next) {
  /*
    Now that we finally have username and password, let's see if it's valid
    1. Find the user in the database by username
    2. Compare the plaintext password we now have against the encrypted password in the db
       - bcrypt does this by re-encrypting the plaintext password and comparing THAT
    3. Either we're valid or we throw an error
  */
    try {
      // const user = await Users.findOne({ username: username })
      // const valid = await bcrypt.compare(password, user.password);
      // if (valid) {
        res.status(200).json(req.body);
      // }
      // else {
        // throw new Error('Invalid User')
      // }
    } catch (error) {
      //  res.status(403).send("Invalid Login"); 
      next("Invalid Input");
    }

}

module.exports = {
  signup : signup,
  signin : signin
}