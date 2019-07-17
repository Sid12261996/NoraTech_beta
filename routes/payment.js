const router = require('express').Router(),
    razorPay = require('../models/razorPay')
;


router.post('/razorpay', (req, res) => {
    let amount = req.body.amount;
    let paymentCapture = req.body.paymentcapture;
    let receipt = req.body.receipt;
    let notes = req.body.notes;
    razorPay.create(amount, receipt, paymentCapture, notes).then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        console.error(err)
    });
});

module.exports = router;
