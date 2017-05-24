// MAIN SERVER //

// DEPENDENCIES //
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/final_project';
var db = mongoose.connection;
var session = require('express-session');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');


// MIDDLEWARE //
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
  secret: "final_project-yas",
  resave: false,
  saveUninitialized: false
}));

// CONTROLLERS //
var sessionsController = require('./controllers/sessions.js');
var usersController = require('./controllers/users.js');

// CONTROLLER ROUTES //
app.use('/sessions/', sessionsController);
app.use('/users/', usersController);




//=================== DB CONNECTION ===============
mongoose.connect(mongoUri);
db.once('open', function() {
  console.log('final_project connected to MongoDB!');
});

//================ SERVER CONNECTION ===============

app.listen(port, function() {
  console.log('server is listening on port:', port);
});
