const express = require('express')
const router = express.Router()
const { updateUserProduct } = require('../controller/userproductsController')

//Update a user products
//@route PUT /api/userproducts/:id
//@access Public

router.put('/:id', updateUserProduct)



module.exports = router