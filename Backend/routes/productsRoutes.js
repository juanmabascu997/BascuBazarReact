const express = require('express')
const router = express.Router()
const { getProducts, getProductById, addProduct, updateProduct, changeState} = require('../controller/productsController')

//Get all products
//@route GET /api/products
//@access Public

router.get('/', getProducts)

//Get a product by id
//@route GET /api/products/:id
//@access Public

router.get('/:id', getProductById)

//Add a product
//@route POST /api/products
//@access Public

router.post('/', addProduct)

//Update a product
//@route PUT /api/products/products/:id
//@access Public

router.put('/products/:id', updateProduct)

//Update a state of product
//@route PUT /api/product/update/:id
//@access Public

router.put('/update/:id', changeState)

module.exports = router
