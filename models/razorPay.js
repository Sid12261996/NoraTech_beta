const Razorpay = require('razorpay'),
    razor = require('../environment').env
;


const instance = new Razorpay({
    key_id: razor["razor-key-id"],
        key_secret: razor["razor-secret-key"],
    // headers: {
    //     "X-Razorpay-Account": razor["account-id"]
    // }
});

const currency = "INR";
const payment_capture = 1;
exports.create = async (amount, receipt, notes = "") => {

    return instance.orders.create({amount, currency, receipt, payment_capture, notes}).then(result => {

        return result;
    });
};
