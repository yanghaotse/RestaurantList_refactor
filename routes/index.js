const express = require('express')
const router = express.Router()

const home = require('./models/home')
const restaurants = require('./models/restaurants')

router.use('/', home)
router.use('/restaurants', restaurants)


module.exports = router