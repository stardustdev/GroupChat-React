"use strict";

var mongoose = require("mongoose");
var Message = require('../model/message');

var GroupSchema = new mongoose.Schema({
  title: String,
  messages: [Message.schema]
});

module.exports = mongoose.model("Group", GroupSchema);
