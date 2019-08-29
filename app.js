const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    path = require('path'),
    mailer = require('./routes/mailer'),
    Url = require('./environment'),
    mongoose = require('mongoose'),
    razorPay = require('./models/razorPay'),
    EnrolledRoute = require('./routes/EnrolledRoute'),
    payment = require('./routes/paymentRoute')

;
app.use(cors());


//Mongo Connection

mongoose.connect(Url.env.MongoUrl || process.env.MongoUrl, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//static files
app.use('/public', express.static('public'));

//Routes
app.use('/mail', mailer);
app.use('/enroll', EnrolledRoute);
app.use('/payment',payment);
app.get('/logo',(req,res)=>{
    res.contentType('image/png');
    res.sendFile('./public/Images/Logo1-copy.png',{root: __dirname});
});


// start page for API
app.get('/*', (req, res) => {
    res.sendFile('./index.html', {root: __dirname});
});


module.exports = app;
