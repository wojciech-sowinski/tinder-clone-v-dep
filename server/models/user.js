const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    firstName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date
    },
    gender: {
        type: String
    },
    interest: {
        type: String
    },
    aboutMe: {
        type: String
    },
    imgUrl: {
        type: [String]
    },
    matches: {
        type: [String]
    },
    forgotten: {
        type: [String]
    },
    created: {
        type: Date,
        default: Date.now
    }

});


const User = mongoose.model('User', schema);

module.exports = User