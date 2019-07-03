var express  = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser= require('body-parser'),
    path = require('path'),
    nodemailer = require('nodemailer'),
    mailer = require('./routes/mailer')
;
app.use(cors());

const testAccount={
    user:'noratechsolutionspvtltd@gmail.com',
    pass:'noraAsdf@123'
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/mail', mailer);


app.get('/*',(req,res)=>{
    res.sendFile('./index.html',{root:__dirname});
});





module.exports = app;
