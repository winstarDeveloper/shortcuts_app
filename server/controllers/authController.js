const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
        // role: req.body.role  // not secure
    });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        return next(new AppError('Please provide Email and password!', 404));
    }

    const user = await User.findOne({ email }).select('+password');

    if(!user || !await user.correctPassword(password, user.password)){
        return next(new AppError('Incorrect Email or Password', 401));
    }

    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    });
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(new AppError('You are not Logged in! Please login.', 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // check if the user still exists
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        return next(new AppError("The user belonging to this token no longer exists", 401));
    }

    req.user = currentUser;
    next(); 
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have permission to perform this action!', 403));
        }

        next();
    }
}