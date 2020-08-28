const mongoose = require('mongoose');
const validator = require('validator')
const Schema = mongoose.Schema;

//Create the User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        required: true,

    },
    register_date: {
        type: Date,
        default: Date.now
    }

});

module.exports = User = mongoose.model('users', UserSchema);