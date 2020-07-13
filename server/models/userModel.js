const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an Email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a Valid Email']
    },
    password: {
        type: String,
        required: [true, 'Please give a Password'],
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin']
    }
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    // Hash password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;