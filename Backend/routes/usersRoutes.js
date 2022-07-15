const express = require('express')
const router = express.Router()
const { getUsers, getUserByID, addUser} = require('../controller/usersController')

//Get all products
//@route GET /api/products
//@access Public

router.get('/', getUsers)

//Get a product by id
//@route GET /api/product/:id
//@access Public

router.get('/:id', getUserByID)

//Add a product
//@route POST /api/products
//@access Public

router.post('/', addUser)



module.exports = router