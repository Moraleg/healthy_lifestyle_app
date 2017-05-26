// MAIN SERVER //

// DEPENDENCIES //
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/final_project';
const db = mongoose.connection;
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');


// MIDDLEWARE //
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
  secret: "final_project-yas",
  resave: false,
  saveUninitialized: false
}));

// CONTROLLERS //
const sessionsController = require('./controllers/sessions.js');
const usersController = require('./controllers/users.js');
const workoutController = require('./controllers/workouts.js');

// CONTROLLER ROUTES //
app.use('/sessions/', sessionsController);
app.use('/users/', usersController);
app.use('/workouts/', workoutController);




//=================== DB CONNECTION ===============
mongoose.connect(mongoUri);
db.once('open', function() {
  console.log('final_project connected to MongoDB!');
});

//================ SERVER CONNECTION ===============

app.listen(port, function() {
  console.log('server is listening on port:', port);
});
