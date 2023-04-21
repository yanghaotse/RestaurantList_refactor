
const Restaurant = require("../restaurant")
const db = require('../../config/mongoose')
const restaurantList = require("../restaurant-list.json").results

db.once("open", async() => {   
  console.log("mongodb connected!")
  try{
    for(let i = 0; i < restaurantList.length; i++){
      await Restaurant.create({ 
        name: `${restaurantList[i].name}`,
        name_en: `${restaurantList[i].name_en}`,
        category: `${restaurantList[i].category}`,
        image: `${restaurantList[i].image}`,
        location: `${restaurantList[i].location}`,
        phone: `${restaurantList[i].phone}`,
        google_map: `${restaurantList[i].google_map}`,
        rating: `${restaurantList[i].rating}`,
        description: `${restaurantList[i].description}`
      })
      
    }
    console.log("restaurantSeeder done.")
  }catch (error) {
    console.log(error)
  }finally{
    db.close()
  }
})
// async/ await: 是 JavaScript 的 Promise 語法的擴展，可以讓開發者使用同步的方式編寫異步程式碼，讓程式碼更簡潔易讀。
// try/ catch/ finally: 這是 JavaScript 的錯誤處理語法，用於捕獲可能出現的錯誤並進行處理。
  

// 原本db.once()使用下方程式碼，錯誤原因:資料在還沒完全上傳就被結束了

// db.once("open", () => {
//   console.log("mongodb connected!")
//   for(let i = 0; i < restaurantList.length; i++){
//     Restaurant.create({ 
//       name: `${restaurantList[i].name}`,
//       name_en: `${restaurantList[i].name_en}`,
//       category: `${restaurantList[i].category}`,
//       image: `${restaurantList[i].image}`,
//       location: `${restaurantList[i].location}`,
//       phone: `${restaurantList[i].phone}`,
//       google_map: `${restaurantList[i].google_map}`,
//       rating: `${restaurantList[i].rating}`,
//       description: `${restaurantList[i].description}`
//     })
      
//   }
// })
//   .then(() => console.log("restaurantSeeder done."))
//   .catch( error => console.log(error))
//   .finally(() => db.close())



