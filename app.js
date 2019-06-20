var express  = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser= require('body-parser'),
    path = require('path'),
    nodemailer = require('nodemailer')
;
app.use(cors());

const testAccount={
    user:'noratechsolutionspvtltd@gmail.com',
    pass:'noraAsdf@123'
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


async function sendMail(subject,body){
    let info = await transporter.sendMail({
        from: 'noratechsolutionspvtltd@gmail.com', // sender address
        to: "sidharthrkc@gmail.com", // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
        // html: "<b>Hello world?</b>" // html body
    });
}
const transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
    }
});

app.post('/mail',(req,res)=>{
    sendMail(req.body.subject,req.body.body);
    res.send('mail sent successfully')
})


app.get('/*',(req,res)=>{
    res.sendFile('./index.html',{root:__dirname});
});





module.exports = app;
