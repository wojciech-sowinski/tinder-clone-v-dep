const mongoose = require('mongoose');


const schema = new mongoose.Schema({

    from: {
        type: String,
        require
    },
    to: {
        type: String,
        require
    },
    body: {
        type: String,
        require
    },
    created: {
        type: Date,
        default: Date.now
    },
    displayed: {
        type: Boolean,
        default: false
    }


});


const Message = mongoose.model('Message', schema);

module.exports = Message