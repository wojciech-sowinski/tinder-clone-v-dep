const express = require('express');
const router = express.Router();
const fs = require('fs');
const path =require('path')
const User = require('../models/user')
const Message = require('../models/message')


router.post('/deluserimg',(req,res)=>{
    
    if (req.session.authToken) {
        const file = path.parse(req.body.filePath)
        const deleteUserImg = User.findByIdAndUpdate(req.session.authToken,{
            $pull:{
                imgUrl:req.body.filePath
            }
        })
        deleteUserImg.exec((err,data)=>{
            if(err){
                console.log(err);
                
            }
            if(data){    
                
                console.log(data);
                fs.unlinkSync(path.normalize("./userimgs/"+file.name),(err)=>{
                    if(err){
                        console.log(err);
                        
                    }
                })      
                
                res.json({
                    result: "img deleted"
                })
            }else{
                res.json({
                    result: "img delete faile"
                })
            }
        })



    }else{
        res.redirect('/islogged')
    }
    
})

router.post('/register', (req, res) => {
    const userExistsFind = User.findOne({
        email: req.body.email
    })
    userExistsFind.exec((err, data) => {
        if (err) {
            console.log('exists user search error', err);
        }

        if (data) {
            res.json({
                result: "user exists"
            })
        } else {

            const user = new User(req.body)
            user.save()

            res.json({
                result: "account created"
            })
        }
    })

})

router.post('/login', (req, res) => {

    // res.setHeader('Access-Control-Allow-Credentials', true)
    // res.setHeader('Access-Control-Allow-Origin', '*')
    // // another common pattern
    // // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    // res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    // res.setHeader(
    //   'Access-Control-Allow-Headers',
    //   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    // )

    const {
        email,
        password
    } = req.body

    const userExistsFind = User.findOne({
        email,
        password
    })
    userExistsFind.exec((err, data) => {

        if (err) {
            console.log('login user search error', err);
        }
        if (data) {


            req.session.authToken = data.id
// res.send({log:true})
            res.redirect('/islogged')

        } else {

            req.session = null

            res.json({logged:false,resultInfo:'Bad login or password.'})
        }
    })




})

router.get('/islogged', (req, res) => {

    if (req.session.authToken) {
        User.findById(req.session.authToken, {
            firstName: 1,
            imgUrl: 1,
            gender: 1,
            interest: 1,
            aboutMe: 1,
            email: 1,
            matches: 1,
            forgotten: 1,
            birthDate: 1
        }, (err, data) => {
            if (err) {
                console.log('get user data failed');
            }
            res.json({
                logged: true,
                userData: data,
                resultInfo:''
            })
        })
    } else {
        res.json({
            logged: false
        })
    }

})

router.get('/logout', (req, res) => {
    req.session = null
    res.redirect('islogged')
})

router.post('/user', (req, res) => {
       
    if (req.session.authToken) {
        
        const userDataUpdate = User.findByIdAndUpdate(req.session.authToken, req.body)
        userDataUpdate.exec((err, data) => {
            if (err) {
                console.log(err);
                
            }
            if (data) {
                res.json({
                    result: 'user data updated'
                })
            }
            
        })
    }
    
})

router.post('/matchupd', (req, res) => {
    
    
    const {
        userId,
        matchId
    } = req.body
    
    if (req.session.authToken) {
        
        
        Promise.all([
            User.findOneAndUpdate({
                $and: [{
                    _id: userId
                }, {
                    $not: {
                        $matches: {
                            matchId
                        }
                    }
                }]
            }, {
                $push: {
                    matches: matchId
                }
            }),
            User.findOneAndUpdate({
                $and: [{
                    _id: matchId
                }, {
                    $not: {
                        $matches: {
                            userId
                        }
                    }
                }]
            }, {
                $push: {
                    matches: userId
                }
            })
            
        ]).then(() => {
            User.findOne({
                _id: userId
            }, (err, resolve) => {
                if (err) {
                    console.log(err);
                    
                } 
                // else {
                //     const message = new Message({
                //         from: userId,
                //         to: matchId,
                //         body: "Hey, I match you. Let's talk :)"
                //     })
                    
                //     message.save((err, result) => {
                //         if (err) {
                //             console.log('message save ');
                            
                            
                //         } else {
                //             console.log('message save to db');
                            
                //         }
                //     })
                // }
                
                
            })
            res.end()
            
        })
    }
})

router.post('/forgotten',(req,res)=>{
    const {
        characterId
    } = req.body

    if (req.session.authToken) {

console.log(req.body);

User.findByIdAndUpdate(req.session.authToken,{
    $push: {
        forgotten: characterId
    }},(err,data)=>{
        if(err){
            console.log(err);
        }else{
        res.end()
        }
    })



    }
    res.end()


})

module.exports = router