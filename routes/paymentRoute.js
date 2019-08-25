const router = require('express').Router(),
   payment = require('../controllers/paymentController')
;


router.post('/Order/create',payment.createOrder );


router.post('/transaction/create',payment.createTransaction);

router.post('/webhooks',payment.webhooks);

module.exports = router;
