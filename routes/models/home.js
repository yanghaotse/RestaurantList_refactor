const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/',(req, res) => {
  Restaurant.find()
    .lean()
    .sort({name: 'asc'}) //sort()排序，asc正序/desc反序
    .then((restaurants) => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})

// router.get("/sort/?sort-select=asc", (req, res) => {
//   console.log('params:',req.params)
//   console.log('query:',req.query)

// })


module.exports = router