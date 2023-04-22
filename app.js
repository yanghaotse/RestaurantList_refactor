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

app.listen( port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
