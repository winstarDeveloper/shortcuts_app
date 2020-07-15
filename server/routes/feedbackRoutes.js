const express = require('express');
const feedbackController = require('./../controllers/feedbackController');
const authController = require('./../controllers/authController');

const feedbackRouter = express.Router();

feedbackRouter.route("/").get(authController.protect, feedbackController.getFeedbacks).post(feedbackController.addFeedback);

module.exports = feedbackRouter;
