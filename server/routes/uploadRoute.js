const express = require('express');
const path = require('path')
const router = express.Router();
const User = require('../models/user')
const multer  = require('multer');
const { json } = require('body-parser');
const { url } = require('inspector');


const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ]

const fileStorageEngine = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'./userimgs')
    },filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
      }
    
})

const upload = multer({
    storage:fileStorageEngine,
    fileFilter: (req,file,cb)=>{
        if (!whitelist.includes(file.mimetype)||!req.session.authToken) {
            return cb(null, false)            
          }      
          cb(null, true)
    }
    
})


router.use(json())




router.post('/upload',upload.single("image"), (req,res)=>{


    const newImgUrl = req.protocol + '://' + req.get('host') + '/userimgs/' + req.file.filename
    
    
   
    if (req.session.authToken) {     
     
        const userDataUpdate = User.findByIdAndUpdate(req.session.authToken, {
            $push: {
                imgUrl:newImgUrl
            }
        })
        userDataUpdate.exec((err, data) => {
            if (err) {
                res.json({uploadResult:false})              
            }
            if (data) {
               res.json({uploadResult:true})            
            }            
        })
    }
  



   


})


module.exports =router