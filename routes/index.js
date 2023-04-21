const express = require('express')
const router = express.Router()

const home = require('./models/home')


router.use('/',home)
module.exports = router