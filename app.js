const express = require('express'),
    app = express(),
    cors = require('cors'),
    nodemailer = require('nodemailer'),
    bodyParser= require('body-parser')
;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Node is Working!!!')
});


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noratechsolutionspvtltd@gmail.com',
        pass: 'noraasdf@123'
    }
});


function SendMail(subject, to, body) {

    const mailOptions = {
        from: 'noratechsolutionspvtltd@gmail.com',
        to: to,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

app.post('/mail', (req, res) => {
    console.log(req.body.subject, req.body.to, req.body.body)
    SendMail(req.body.subject, req.body.to, req.body.body);
    res.send('mail sent successfuly');
});


module.exports = app;
