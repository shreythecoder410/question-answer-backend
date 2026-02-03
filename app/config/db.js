const mongoose = require("mongoose")

const DBCon = async()=>{
   try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("dbconnected")

   } catch(error){
    console.error("db disconnected")

   }
}

module.exports = DBCon