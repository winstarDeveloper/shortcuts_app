const express = require("express");
const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const appRouter = require('./routes/appRoutes');
const authRouter = require('./routes/authRoutes');
const feedbackRouter = require('./routes/feedbackRoutes');

// set security http headers
app.use(helmet());

// Development logging
if(process.argv[2] === 'development'){
    app.use(morgan('dev'));
}

// enable cors
app.use(cors());

// Request limit at 100/hr
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json());

// serving static files
app.use(express.static(`${__dirname}/public`));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp(/*{
    whitelist: ['']
}*/));

// Set route paths
app.use("/api/v1/app", appRouter);
app.use("/api/v1/user", authRouter);
app.use("/api/v1/feedback", feedbackRouter);

// app.use((req, res, next) => {
//     console.log("hello Middleware");
//     next();
// })

// To serve HTML Files
// app.use(express.static(`${__dirname}/public/index.html`));

app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status:"fail",
    //     message: `Can't find ${req.originalUrl} on this server`
    // })

    // const err = new Error(`Can't find ${req.originalUrl} on this server`);
    // err.statusCode = 404;
    // err.status = 'fail';

    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
})

app.use(globalErrorHandler); //(err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.status = err.status || 'error';

//     res.status(err.statusCode).json({
//         status: err.status,
//         message: err.message
//     });
// })

module.exports = app;

