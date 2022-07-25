const express = require('express')
const router = express.Router()
const { getProducts, getProductById, addProduct, updateProduct} = require('../controller/productsController')

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
//@route PUT /api/products/:id
//@access Public

router.put('/products/:id', updateProduct)


module.exports = router
