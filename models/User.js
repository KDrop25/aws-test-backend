const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    stdcode: {
        type: String,
    },
    mobilenumber: {
        type: String,
    },
    roles: {
        User: {
            type: Number,
            default: 10
        },
        Editor: Number,
        Admin: Number
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type:Boolean,
        default:false
    },
    refreshToken: String,
    profilepicture: String
});

module.exports = mongoose.model('User', userSchema);