const Router = require('express').Router(),
    mailer = require('../models/mailerModel.js');


Router.post('',  (req, res) => {
   mailer.sendMail(req.body.subject, req.body.body).then(response=>{
        if(response){
            res.status(200).json({message: 'Successfully sent the mail!!'})
        }
        else {

            res.status(500).json({message: 'Could not send the mail!!'})
        }
    });

});

module.exports = Router;
