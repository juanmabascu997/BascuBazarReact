const express = require('express')
const router = express.Router()
const { getUsers, getUserByID, addUser, updateUser, updateUserProduct} = require('../controller/usersController')

//Get all users
//@route GET /api/users
//@access Public

router.get('/', getUsers)

//Get a user by id
//@route GET /api/users/:id
//@access Public

router.get('/:id', getUserByID)

//Add a user
//@route POST /api/users
//@access Public

router.post('/', addUser)

//Update a user
//@route PUT /api/users/:id
//@access Public

router.put('/:id', updateUser)

//Update a user products
//@route PUT /api/users/:id
//@access Public

router.put('/products/:id', updateUserProduct)


module.exports = router