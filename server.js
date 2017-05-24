// MAIN SERVER //

// DEPENDENCIES //
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/project_3';
var db = mongoose.connection;


// CONTROLLERS //

// MIDDLEWARE //










//=================== DB CONNECTION ===============
mongoose.connect(mongoUri);
db.once('open', function() {
  console.log('final_project connected to MongoDB!');
});

//================ SERVER CONNECTION ===============

app.listen(port, function() {
  console.log('server is listening on port:', port);
});
