const express = require('express')
const router = express.Router()
const { getProducts, getProductById, addProduct} = require('../controller/productsController')

//Get all products
//@route GET /api/products
//@access Public

router.get('/', getProducts)

//Get a product by id
//@route GET /api/product/:id
//@access Public

router.get('/:id', getProductById)

//Add a product
//@route POST /api/products
//@access Public

router.post('/', addProduct)



module.exports = router
