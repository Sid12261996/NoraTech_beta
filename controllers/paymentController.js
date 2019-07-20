const mongoose = require("mongoose"),

    transactionModel = require("../models/transactionModel"),
    razorPay = require('../models/razorPay')
;


exports.createTransaction = (orderId, paymentId,enrolledStudentId,amountPaid) => {
    const transaction = new transactionModel({
        _id:mongoose.Types.ObjectId(),
        orderId:orderId ,
        paymentId: paymentId,
        enrolledStudentId: enrolledStudentId,
        paymentStatus:'Success' ,
        paymentDate: new Date(),
        amountPaid: amountPaid
    });

    transaction.save().then(
        result => {
        return result;
        },
        err => console.error(err));
};

exports.createOrder = (req, res) => {
    let amount = req.body.amount;
    let receipt = req.body.receipt;
    let notes = req.body.notes;
    razorPay.create(amount, receipt, notes).then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        console.error(err)
    });
};
