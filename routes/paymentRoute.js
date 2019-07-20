const router = require('express').Router(),
   payment = require('../controllers/paymentController')
;


router.post('/Order/create',payment.createOrder );


router.post('/transaction/create',payment.createTransaction);

module.exports = router;
