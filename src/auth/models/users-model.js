"use strict"

const mongoose = require('mongoose');
const bcrypt = require("bcrypt");



// Create a mongoose model
const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const UsersModel = mongoose.model('users', usersSchema);

class User {

  constructor(model) {
    this.model = model;
  }

  async create(obj) {
    obj.password = await bcrypt.hash(obj.password, 10);
    const user = new this.model(obj);
    const record = await user.save(obj);
    return record;
  }

  async read(obj) {
    try {
      const user = await this.model.findOne({ username: obj.username });
      if (user) {
        const valid = await bcrypt.compare(obj.password, user.password);
        if (valid) {
          return user;
        }
        else {
          return false;
        }
      } else {
        return false;
      }

    } catch (e) {
      console.log(`Error from read function`, e);
    } 
  }
}

const user = new User(UsersModel);

module.exports = user;