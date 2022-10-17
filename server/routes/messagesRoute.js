const express = require('express');
const router = express.Router();

const Message = require('../models/message')


router.get('/msgs', (req, res) => {


    if (req.session.authToken) {
        Message.find({
            $or: [{
                to: req.session.authToken
            }, {
                from: req.session.authToken
            }]
        }).sort({
            created: 1
        }).exec((err, data) => {
            if (err) {
                console.log('user mshs fail');
            } else {
                res.json(data)

            }
        })




    } else {
        res.json([])
    }

})


router.get('/newmsgs', (req, res) => {


    if (req.session.authToken) {
        Message.find({
            $and: [{
                to: req.session.authToken
            }, {
                displayed: false
            }]

        }).count().exec((err, data) => {
            if (err) {
                console.log('user mshs fail');
            } else {
                res.json(data)

            }
        })




    } else {
        res.json(0)
    }

})

router.post('/msg', (req, res) => {




    if (req.session.authToken) {

        const message = new Message({
            from: req.session.authToken,
            to: req.body.to,
            body: req.body.body
        })

        message.save((err, result) => {
            if (err) {
                console.log('message save ');
                res.end()

            } else {
                console.log('message save to db');
                res.json(result)
            }
        })


    }
})

router.post('/msgdisplayed', (req, res) => {

   

    if (req.session.authToken) {

        Message.updateMany({
            $and: [{
                displayed: false
            }, {
                to: req.body.to
            }, {
                from: req.body.from
            }]
        }, {

            displayed: true
        }).exec((err, result) => {
            console.log(result);

           res.end()
        })

        res.end()
    }



})

module.exports = router