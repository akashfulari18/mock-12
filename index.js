const express = require('express')
const connection = require('./db')
const cors =  require('cors')
const userRoute = require('./routes/user.routes')
const UserModel = require('./model/user.model')
const empRoute = require('./routes/emp.routes')

require("dotenv").config()
const app = express()

app.use(express.json())
app.use(cors())

app.use("/users",userRoute)
app.use("/employees",empRoute)
app.get("/users",async(req,res)=>{
    

    try {
        const users = await UserModel.find()
        res.status(200).send({data:users})
        
    } catch (err) {
        res.status(400).send({error:err.message})
        
    }
})
app.listen(process.env.PORT,async()=>{
    try {
        
        await connection

        console.log("connected")
        
    } catch (error) {
        
        console.log("not connected")
    }
    console.log(`serverr is running on port ${process.env.PORT}`)
})