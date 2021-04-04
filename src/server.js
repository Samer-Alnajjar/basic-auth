"use strict"

// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require('cors');
const userRouter = require("./auth/router.js");
const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/500');

// Prepare the express app
const app = express();

// Prepare the PORT variable
const PORT = process.env.PORT;

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));


// Routes

app.use("/api/v1", userRouter);

/**
 * This function responsible for the error handler
 */

 app.use(errorHandler);

 /**
  * This function responsible for the not found handler
  */
 
 app.use('*', notFoundHandler);

// Listening to the Server inside the index.js

function start(port) {
  mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => {
    app.listen(port, () => console.log(`SERVER IS LISTENING TO PORT: ${port}`));
  })
  .catch(e => {
  console.log(`__CONNECTION ERROR__`, e.message);
  })
}

module.exports = {
  server:app,
  start:start,
  port: PORT
}
