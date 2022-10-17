const express = require('express');
const router = express.Router();

const User = require('../models/user')

router.get('/users', (req, res) => {

    User.find({
        firstName: {
            $exists: true
        },
        imgUrl: {
            $exists: true
        },
        gender: {
            $exists: true
        },
        interest: {
            $exists: true
        },
        aboutMe: {
            $exists: true
        },
        birthDate: {
            $exists: true
        },
    }, {
        firstName: 1,
        imgUrl: 1,
        gender: 1,
        interest: 1,
        aboutMe: 1,
        birthDate: 1
    }).sort({
        created: -1
    }).exec((err, data) => {
        if (err) {
            console.log('user catalog fail');
        } else {
            res.json(data)

        }
    })


})


module.exports = router