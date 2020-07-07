const express = require("express");
const app = express();
const morgan = require('morgan');
const appRouter = require('./routes/appRoutes');

// Middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(express.json());
app.use("/api/v1/app", appRouter);
// app.use((req, res, next) => {
//     console.log("hello Middleware");
//     next();
// })

// To serve HTML Files
// app.use(express.static(`${__dirname}/public/index.html`));

module.exports = app;

