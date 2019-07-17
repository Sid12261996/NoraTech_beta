const mongo = require('mongoose'),
    schema = mongo.Schema
;

const EnrolledStudents = new schema({
    _id: schema.Types.ObjectId,
    firstName: {type: schema.Types.String, required: true},
    lastName: {type: schema.Types.String, required: true},
    registeredFor: {type: schema.Types.String, required: true},
    contactEmail: {type: schema.Types.String, required: true, minlength: 3, maxlength: 30},
    amountPaid: {type: schema.Types.Number, required: true},
    contactNumber:{type:schema.Types.Number,required:true,minlength: 10}
});

module.exports = mongo.model('EnrolledStudents', EnrolledStudents);
