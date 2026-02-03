const express = require("express")
const DBConnection = require("../backend/app/config/db")
const dotEnv=require("dotenv").config()
const app= express()



app.use(express.json())
app.use("/uploads",express.static("uploads"))

DBConnection()

const AuthRouter = require("../backend/app/router/AuthRoute")
app.use("/auth",AuthRouter)



const port = 5000
app.listen(port,()=>{
    console.log(`server is running on:http://localhost:${port}`)
})


