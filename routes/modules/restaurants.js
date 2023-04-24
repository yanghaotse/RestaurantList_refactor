const express = require('express')
const Restaurant = require('../../models/restaurant')


const router = express.Router()


router.get('/search',(req, res) => {
  const keyword = req.query.keyword
  // console.log(keyword)
  if (!keyword){
    return res.redirect('/')
  }
  Restaurant.find()
    .lean()
    .then( restaurants => {
      const restaurant = restaurants.filter( (item) => {
        return item.name.toLowerCase().trim().includes(keyword.toLowerCase()) || item.category.toLowerCase().trim().includes(keyword.toLowerCase()) //注意必須加return，否則收不到資料
      })
      res.render('index', { restaurants : restaurant, keyword })
      // console.log(restaurant)
    })
    .catch( error => console.log(error))
})

//新增路由 GET
router.get('/new', (req, res) => {
  return res.render("new")
})


// 新增路由POST
router.post('/', (req, res) => {
  const bodyParser = req.body
  // console.log(bodyParser)
  return Restaurant.create( {
    name: bodyParser.name,
    name_en: bodyParser.name_en,
    category: bodyParser.category,
    image: bodyParser.image,
    location: bodyParser.location,
    phone: bodyParser.phone,
    google_map: bodyParser.google_map,
    rating: bodyParser.rating,
    description: bodyParser.description
  })
    .then( () => res.redirect('/'))
    .catch( error => console.log(error))

})
// 瀏覽一筆資料GET
router.get('/:_id/detail', (req,res) => {
  const id = req.params._id
  // console.log(id)
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render("detail", { restaurants }))
    .catch(error => console.log(error))
})

// 編輯一筆資料 GET
router.get('/:_id/edit', (req,res) => {
  const id = req.params._id
  return Restaurant.findById(id)
    .lean()
    .then( (restaurants) => res.render('edit', { restaurants }))
    .catch( error => console.log(error))
})

// 編輯一筆資料 POST
router.put('/:_id', (req,res) => {
  const id = req.params._id
  const bodyParser = req.body
  return Restaurant.findById(id)
    .then((restaurants) => {
      restaurants.name = bodyParser.name
      restaurants.name_en = bodyParser.name_en
      restaurants.category = bodyParser.category
      restaurants.image = bodyParser.image
      restaurants.location = bodyParser.location
      restaurants.phone = bodyParser.phone
      restaurants.google_map = bodyParser.google_map
      restaurants.rating = bodyParser.rating
      restaurants.description = bodyParser.description
      return restaurants.save()
    })
    .then(() => res.redirect("/"))
    .catch( error => console.log(error))
})
// 刪除一筆資料
router.delete('/:_id', (req,res) => {
  const id = req.params._id
  return Restaurant.findById(id)
    .then( (restaurants) => restaurants.remove()) 
    .then( () => res.redirect('/'))
    .catch( error => console.log(error))
})

module.exports = router