const express = require('express')
const router = express.Router()
const { allPurchases} = require('../controller/purchaseController')

//Get all purchases
//@route GET /api/purchases
//@access Public

router.get('/', allPurchases)



module.exports = router