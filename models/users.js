// USER MODEL //

// DEPENDENCIES //
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


var User = mongoose.model('User', userSchema);

// EXPORT //
module.exports = User;
