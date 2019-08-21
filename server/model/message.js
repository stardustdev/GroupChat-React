var mongoose = require("mongoose");
var File = require('../model/file');
var Account = require('../dao/account');

var MessageSchema = new mongoose.Schema({
  from: Account.schema,
  text: String,
  file: File.schema,
  date: Number
})

var Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
