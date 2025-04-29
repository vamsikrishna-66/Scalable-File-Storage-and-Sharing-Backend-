const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  uploader: { type: String, required: true }, // uploader email
  sharedWith: [String], // list of user emails
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);
