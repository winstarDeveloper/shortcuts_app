const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'An App must have a Name'],
      unique: true,
      trim: true,
      maxlength: [50, 'App Name cannot exceed 50 characters'],
      minlength: [2, 'App Name must have atleast 2 characters']
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [20, 'Description must have atleast 20 characters']
    },
    hits: {
      type: Number,
      default: 0,
      min: [0, 'hits cannot be negative']
    },
    shortcuts: Array
  });
  
  const AppModel = mongoose.model('App', appSchema);

  module.exports = AppModel;
  
//   const testApp = new AppModel({
//     name: "Kaspersky",
//     description: "Antivirus",
//     shortcuts: ["Copy", ["Ctrl", "C"]]
//   });
  
//   testApp.save().then(doc => {
//     console.log(doc);
//   }).catch(err => {
//     console.log('Error: ', err);
//   })