const express = require('express')
const router = express.Router()
const PaymentController = require("../controller/paymentController");
const PaymentService = require("../controller/paymentService"); 
const PaymentInstance = new PaymentController(new PaymentService()); 

router.get('/', (req, res) => {
    res.render('index', { title: 'Express' })
}
)

router.post('/payment', (req, res) => {
    PaymentInstance.getPaymentLink(req, res);
}
)

router.post('/subscription', (req, res) => {
    PaymentInstance.getSubscriptionLink(req, res);
}
)


module.exports = router