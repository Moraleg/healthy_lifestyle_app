// WORKOUT CONTROLLER //
//NEEDS TESTING

// DEPENDENCIES //
const express = require('express');
const router = express.Router();

// MODELS //
const User = require('../models/users.js');
const Workout = require('../models/workouts.js');

// ROUTES //

/* Workout Get Route */
//tested w/ curl -> 'Unauthorized'
router.get('/', function(req, res) {
  if(req.session.currentuser) {
    Workout.find({creator: req.session.currentuser}, function(err, foundWorkout) {
      if (!err) {
        res.json(foundWorkout);
      } else {
        res.json(err);
      }
    });
  } else {
    res.status(401).send('Unauthorized');
  }
});

/* Workout Post Route */
//tested w/ curl -> 'session: false'
// router.post('/', function(req, res) {
//   // console.log('inside post route');
//   if(req.session.currentuser) {
//     req.body.creator = req.session.currentuser._id;
//     Workout.create(req.body, function(err, createdWorkout) {
//       if(!err) {
//         res.json(err);
//       }
//     });
//   } else {
//     res.json({session: false});
//   }
// });


router.post('/new', function (req, res)  {
  // Create new database entry based on user input
  Workout.create(req.body, function (err, createdWorkout) {
    if(!err) {
      // if no error occurs, send json of createdActivity
      res.json(createdWorkout);
    } else {
      // else send error
      res.json(err);
    }
  });
});



/* Workout Put Route */
router.put('/:id', function(req, res) {
  Workout.findById(req.params.id, function(err, foundWorkout) {
    if(req.session.currentuser._id === foundWorkout.creator) {
      Workout.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedWorkout) {
        if (!err) {
          res.json(updatedWorkout);
        } else {
          res.json(err);
        }
      });
    } else {
      res.status(403).send('Forbidden');
    }
  });
});

/* Workout Delete Route */
router.delete('/:id', function(req, res) {
  Workout.findById(req.params.id, function(err, foundWorkout) {
    if(req.session.currentuser._id === foundWorkout.creator) {
      Workout.findByIdAndRemove(req.params.id, function(err, deletedWorkout) {
        const id = deletedWorkout._id.toString();
        if(!err) {
          User.update(
          function(err){
            console.log(err);
          });
          res.json(deletedWorkout);
        } else {
          res.json(err);
        }
      });
    } else {
      res.status(403).send('Forbidden');
    }
  });
});


// EXPORT //
module.exports = router;
