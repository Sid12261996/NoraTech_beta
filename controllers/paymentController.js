const mongoose = require("mongoose"),

    transactionModel = require("../models/transactionModel"),
    razorPay = require('../models/razorPay'),
    razor = require('../environment').env,
    mail = require('../models/mailerModel'),
    webhook = require('../models/webhook.js')
;

const mySecret = razor["razor-secret-key"];

exports.createTransaction = (orderId, paymentId, enrolledStudentId, amountPaid) => {
    const transaction = new transactionModel({
        _id: mongoose.Types.ObjectId(),
        orderId: orderId,
        paymentId: paymentId,
        enrolledStudentId: enrolledStudentId,
        paymentStatus: 'Success',
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
    razorPay.create(parseInt(amount), receipt, notes).then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        console.error(err);
        res.status(400).send(err);
    });
};

exports.webhooks = async (req, res) => {
    // let reqBody = "",
    //     //     signature = req.headers["x-razorpay-signature"];
    //     // req.on("data", (data) => {
    //     //
    //     //     reqBody += data;
    //     // });
    //     // req.on("end", (data) => {
    //     //     console.log(data,reqBody);
    //     //     // mail.sendMail('Webhook',`data:${data}
    //     //     //
    //     //     // reqBody:${reqBody}`,res).then(success=>{
    //     //     //
    //     //     // }).catch(onmessageerror=>console.error(onmessageerror));
    //     //
    //     //
    //     //     // console.log(razorPay.validateWebhookSignature(reqBody, signature, mySecret));
    //     //     res.status(200).send();
    //     // });
    console.log(req.body);
    const payload = req.body;
    const toSave = new webhook({
        _id: mongoose.Types.ObjectId(),
        payload: payload.payload,
        account_id: payload.account_id,
        createdAt: new Date(),
        timeStamp: payload.created_at,
        event: payload.event,
    });
    toSave.save().then(success => {
        res.status(200).send();
    }).catch(err => console.error(err))

};
