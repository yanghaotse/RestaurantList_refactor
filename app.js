const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const bodyParser = require("body-parser")

const app = express()
const port = 3000

app.engine('hbs', exphbs({defaultLayout : 'main', extname : '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended : true })) //body-parser
app.use(express.static('public')) //使用靜態檔案


if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true,  useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})
db.once('open', () => {
  console.log('mongoDB connected!')
})


app.get('/',(req, res) => {
  // res.render("index")
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})

// 搜尋路由
app.get('/search',(req, res) => {
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
app.get('/restaurants/new', (req, res) => {
  return res.render("new")
})


// 新增路由POST
app.post('/restaurants', (req, res) => {
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
app.get('/restaurants/:_id/detail', (req,res) => {
  const id = req.params._id
  // console.log(id)
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render("detail", { restaurants }))
    .catch(error => console.log(error))
})

// 編輯一筆資料 GET
app.get('/restaurants/:_id/edit', (req,res) => {
  const id = req.params._id
  return Restaurant.findById(id)
    .lean()
    .then( (restaurants) => res.render('edit', { restaurants }))
    .catch( error => console.log(error))
})

// 編輯一筆資料 POST
app.post('/restaurants/:_id/edit', (req,res) => {
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
app.post('/restaurants/:_id/delete', (req,res) => {
  const id = req.params._id
  return Restaurant.findById(id)
    .then( (restaurants) => restaurants.remove()) 
    .then( () => res.redirect('/'))
    .catch( error => console.log(error))
})

app.listen( port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})