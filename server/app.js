const mongoose = require('mongoose');
const cookieSession = require('cookie-session')
const express = require('express')
const cors = require("cors");
const config = require('./config')
const path = require('path')
const bodyParser = require('body-parser')


//routes
const router = express.Router()

const uploadRoute =require('./routes/uploadRoute')
const messagesRoute = require('./routes/messagesRoute')
const userRoute = require('./routes/userRoute')
const usersRoute = require('./routes/usersRoute')


const {
    serverPort,
    cookieKeys,
    cookieMaxAge,
    cookieSessionName,
    mongoDbUrl
} = config.module

const app = express()
app.listen(serverPort)



mongoose.connect(mongoDbUrl)


const corsOption = {
    origin: 'https://tinder-clone-client-oyfvtm7sm-wojciech-sowinski.vercel.app',
    // origin: 'http://owliedev.pl',
    credentials: true,
    
}

//middleware
app.use(cors(corsOption));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','https://tinder-clone-client-oyfvtm7sm-wojciech-sowinski.vercel.app');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    
    next();
  });


  app.set("trust proxy", 1);
app.use(express.json())
app.use(cookieSession({
    name: cookieSessionName,
    keys: cookieKeys,
    maxAge: cookieMaxAge,
    httpOnly: false,
  sameSite: "None",
  secure: true,

}))


app.use('/',cors(corsOption),uploadRoute)
app.use('/',cors(corsOption),messagesRoute)
app.use('/',cors(corsOption),userRoute)
app.use('/',cors(corsOption),usersRoute)

app.get('/userimgs/:name',cors(corsOption),(req,res)=>{
    
    res.sendFile(path.join(__dirname,'./userimgs', req.params.name))

}
)



