const mongo = require('mongoose'),
    schema = mongo.Schema
;

const transactionModel = new schema({
    _id: schema.Types.ObjectId,
    orderId:{type:schema.Types.String,required:true},
    paymentId:{type:schema.Types.String,required:true},
    enrolledStudentId:{type:schema.Types.ObjectId,required:true},
    paymentStatus:{type:schema.Types.String,required:true},
    paymentDate:{type:schema.Types.Date,required:true},
    amountPaid:{type:schema.Types.Number,required:true}
});

module.exports = mongo.model('transaction',transactionModel);
