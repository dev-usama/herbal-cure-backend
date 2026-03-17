const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: {type: String, required: true },
  age: { type: Date, required: true },
  disease: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'patient' },
  gender: { type: String, required: true},
  phone: {type: Number, required: true}
});

module.exports = mongoose.model('User', userSchema, "herbalCureDB");