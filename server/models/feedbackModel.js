const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name required for Feedback'],
      unique: true,
      trim: true,
      maxlength: [50, 'User Name cannot exceed 50 characters'],
      minlength: [2, 'User Name must have atleast 2 characters']
    },
    email: {
      type: String,
      default: 'NA',
      trim: true
    },
    feedback: {
      type: String,
      minlength: [10, 'Your feedback must have atleast 10 characters'],
      maxlength: [500, 'Your Feedback cannot exceed 500 characters']
    },
    dateAdded: {
        type: Date,
        default: Date.now(),
        required: true
    }
  });
  
  const feedbackModel = mongoose.model('feedback', feedbackSchema);

  module.exports = feedbackModel;