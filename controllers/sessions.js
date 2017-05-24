// SESSIONS CONTROLLER //

// DEPENDENCIES //
var express = require('express');
var router = express.Router();
var session = require('express-session');
var bcrypt = require('bcrypt');

// MODELS //
var Users = require('../models/users.js');

// ROUTES //

/* Login */
router.get('/login/', function(req, res) {

});

/* Get Current User */
/* Route for Angular to get session information. Needs testing when we implement AngularJS */
router.get('/', function(req, res) {
  if(req.session.currentuser) {
    delete req.session.currentuser.password;
  }
  res.json(req.session.currentuser);
});

/* Create Session */
// Test to see if this is working
router.post('/', function(req, res) {
  Users.findOne({ username: req.body.username }, function(err, foundUser) {
    var foundUserBoolean = !!foundUser;
    if(foundUserBoolean) { //if a user is found in the db
      if(bcrypt.compareSync(req.body.password, foundUser.password)) { //and password matches
        req.session.currentuser = foundUser;
        res.json({ success: true }); //send results
      } else { //if password doesn't match
        res.json({ success: false }); // sens result
      }
    }
  });
});

/* Destroy Session */
router.delete('/', function(req, res) {
  req.session.destroy(function() {
    res.json({ currentStatus: 'logged-out' });
  });
});



// Export //
module.exports = router;
