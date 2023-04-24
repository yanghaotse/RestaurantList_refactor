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

router.get("/sort", (req, res) => {
  const sort = req.query.sort
  switch (sort) {
    case "A->Z":
      return Restaurant.find()
        .lean()
        .sort({name: 'asc'}) //sort()排序，asc正序/desc反序
        .then((restaurants) => res.render("index", { restaurants, sort }))
        .catch(error => console.log(error))
    case "Z->A":
      Restaurant.find()
        .lean()
        .sort({name: 'desc'}) //sort()排序，asc正序/desc反序
        .then((restaurants) => res.render("index", { restaurants, sort }))
        .catch(error => console.log(error))
      break
    case "類別":
      Restaurant.find()
        .lean()
        .sort({category: 'asc'}) //sort()排序，asc正序/desc反序
        .then((restaurants) => res.render("index", { restaurants, sort }))
        .catch(error => console.log(error))
      break
     case "地區":
      Restaurant.find()
        .lean()
        .sort({location: 'asc'}) //sort()排序，asc正序/desc反序
        .then((restaurants) => res.render("index", { restaurants, sort }))
        .catch(error => console.log(error))
      break 
  }
})



module.exports = router