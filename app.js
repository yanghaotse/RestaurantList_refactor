const express = require('express')
const exphbs = require('express-handlebars')

const Restaurant = require('./models/restaurant')
const bodyParser = require("body-parser")
const methodOverride = require('method-override')
const routes = require('./routes')//引入路由器時，路徑設定為 /routes 就會自動去尋找目錄下叫做 index 的檔案
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbs({defaultLayout : 'main', extname : '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended : true })) //body-parser
app.use(express.static('public')) //使用靜態檔案

app.use(methodOverride('_method'))
app.use(routes)

app.get("/sort", (req, res) => {
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

app.listen( port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
// /?sort-select=asc
// router.get('/',(req, res) => {
//   Restaurant.find()
//     .lean()
//     .sort({name: 'asc'}) //sort()排序，asc正序/desc反序
//     .then((restaurants) => res.render("index", { restaurants }))
//     .catch(error => console.log(error))
// })