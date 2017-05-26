// USER MODEL //

// DEPENDENCIES //
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


const User = mongoose.model('User', userSchema);

// EXPORT //
module.exports = User;
