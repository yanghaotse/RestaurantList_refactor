const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/',(req, res) => {
  // res.render("index")
  Restaurant.find()
    .lean()
    .sort({name: 'asc'}) //sort()排序，asc正序/desc反序
    .then((restaurants) => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})




module.exports = router