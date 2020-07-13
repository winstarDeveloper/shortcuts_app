// const fs = require("fs");
const App = require('./../models/appModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

// appData = JSON.parse(fs.readFileSync(`${__dirname}/../temp/appdata_temp.json`));

// exports.checkId = (req, res, next, value) => {
//   if (req.params.id * 1 > appData.length - 1) {
//     return res.status(404).json({
//       status: "fail",
//       message: "Invalid ID",
//     });
//   }
//   next();
// };

// Alias Middleware
exports.getTopAppsList = (req, res, next) => {
  req.query.fields = 'name';
  next();
};

exports.getPopularApps = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(App.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const apps = await features.query;
  res.status(200).json({ status: 'success', results: apps.length, data: apps });
});

exports.getParticularApp = catchAsync(async (req, res, next) => {
  const temp_app = await App.find({ name: req.params.id });
  if(!temp_app[0]){
    return next(new AppError('No App found with that name', 404));
  }
  const apps = await App.findOneAndUpdate(
    { name: req.params.id },
    { hits: temp_app[0].hits + 1 }
  );

  res.status(200).json({ status: 'success', results: apps.length, data: apps });
});

exports.addApp = catchAsync(async (req, res, next) => {
  const newApp = await App.create(req.body);
  res.status(201).json({
    status: 'success',
    message: 'New App Data Added',
  });

  // try {
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});

exports.updateApp = catchAsync(async (req, res, next) => {
  const newApp = await App.findOneAndUpdate({ name: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  res
    .status(200)
    .json({ status: 'success', data: { message: 'Updated App here' } });
});

exports.deleteApp = catchAsync(async (req, res, next) => {
  const newApp = await App.findOneAndDelete({ name: req.params.id }, req.body);
  if(!newApp){
    return next(new AppError('No App found with that name to delete', 404));
  }
  res.status(200).json({ status: 'success', data: null });
});
