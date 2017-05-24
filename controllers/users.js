// USER CONTROLLER //

// DEPENDENCIES //
var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var bcrypt = require('bcrypt');

// MODELS //
/* workouts model */


// ROUTES //

//GET ROUTE
//change for single user not every user
//tested with curl and in the browser
router.get('/', function(req, res){
  User.find({}, function(err, foundUsers){
    res.json(foundUsers);
  });
});


/* User Get Route */
//tested with curl and browser
router.get('/:id', function(req, res) {
  User.find({user: req.params.id}, function(err, foundUser){ // find user
   // check if session exists and if current user is authorized to view data
   if (req.session.currentuser &&
     req.session.currentuser._id.toString() === foundUser._id.toString()) {
     if (!err) { // if no error occurs ...
       createdUser.password = ''; // password data is cleared out before ...
       res.json(foundUser); // ... user data is send to browser
     } else { // if error occurs ...
       res.json(err); // send error
     }
   }
 });
});

/* User Post Route */
//tested with curl
router.post('/', function(req, res){
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)); //encrypts password
  User.create(req.body, function(err, createdUser){ // creates user
    if (!err) { // if no error occurrs ...
      createdUser.password = ''; // password data is cleared out
      res.json(createdUser); // userData is sent to browser
    } else { // if error occurrs ...
      res.json(err); // error is sent to browser
    }
  });
});

/* User Patch Routes */








// EXPORT //
module.exports = router;
