// WORKOUT MODEL //

// DEPENDENCIES //
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  training: {type: String },
  exerciseType: {type: String},
  equipment: {type: String, required: true},
  duration: {type: String, required: true},
  weeklyGoal: {type: Number },
  notes: {type: String},
  date: {type: String}
});

const Workout = mongoose.model('Workout', workoutSchema);


// EXPORT //
module.exports = Workout;
