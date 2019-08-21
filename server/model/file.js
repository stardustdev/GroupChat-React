var mongoose = require("mongoose");

var FileSchema = new mongoose.Schema({
  name: String,
  size: Number,
  mine: String,
  unique: String
});

var File = mongoose.model("File", FileSchema);

module.exports = File;
