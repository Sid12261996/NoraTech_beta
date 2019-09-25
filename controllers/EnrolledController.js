const mongoose = require("mongoose"),

    EnrolledStudents = require("../models/EnrolledStudentsModel");
const payment = require("./paymentController");


exports.Enroll_Student = (req, res, next) => {


    const students = new EnrolledStudents({
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        registeredFor: req.body.registeredFor,
        contactEmail: req.body.contactEmail,
        amountPaid: req.body.amountPaid,
        contactNumber: req.body.contactNumber,
        paymentId: req.body.paymentId,
        orderId: req.body.orderId
    });
    students.save()
        .then(result => {
            console.log(result);
            payment.createTransaction(req.body.orderId,req.body.paymentId,result._id,req.body.amountPaid);
            res.status(201).json({
                message: "Student Enrolled",
                createdStudent: {
                    _id: result._id,
                    name: result.name,
                    registeredFor: result.registeredFor,
                    paymentId:result.paymentId
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


