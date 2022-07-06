const express = require('express')
const router = express.Router()
const { getAllInformation } = require('../controller/informationController')

//Get all information
//@route GET /api/information
//@access Public

router.get('/', getAllInformation)



module.exports = router
