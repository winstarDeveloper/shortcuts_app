// const fs = require("fs");
const Feedback = require('./../models/feedbackModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getFeedbacks = catchAsync(async (req, res, next) => {
  const feedbacks = await Feedback.find({}).sort('-dateAdded');
  res.status(200).json({ status: 'success', results: feedbacks.length, data: feedbacks });
});

exports.addFeedback = catchAsync(async (req, res, next) => {
  const newFeedback = await Feedback.create(req.body);
  res.status(201).json({
    status: 'success',
    message: 'New Feedback Data Added'
  });
});
