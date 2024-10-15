const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true, // Set phone as required
        unique: true, // Phone should be unique if required for registration
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
