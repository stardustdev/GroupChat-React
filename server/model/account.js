"use strict";

var mongoose = require("mongoose");

var AccountSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  avatarName: String,
  oauthToken: String,
  favoriteGroupIds: [String]
});

module.exports = mongoose.model("Account", AccountSchema);
