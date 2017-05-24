// MAIN SERVER //

// DEPENDENCIES //
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/final_project';
var db = mongoose.connection;


// MIDDLEWARE //
app.use(express.static('public'));

// CONTROLLERS //
// var sessionsController = require('./controllers/sessions.js');
var usersController = require('./controllers/users.js');







//=================== DB CONNECTION ===============
mongoose.connect(mongoUri);
db.once('open', function() {
  console.log('final_project connected to MongoDB!');
});

//================ SERVER CONNECTION ===============

app.listen(port, function() {
  console.log('server is listening on port:', port);
});
