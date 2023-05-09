const mongoose = require('mongoose')
const express = require('express')
const jwt = require('jsonwebtoken')
const UserModel = require('../model/user.model')
const bcrypt= require('bcrypt')

const userRoute = express.Router()

userRoute.post('/signup',async(req,res)=>{
     const {email} = req.body
    // console.log("body",req)

    try {

        let isPresent = await UserModel.find({email})

        if(isPresent>0){
            res.status(400).send({error:"user already exists...!"})
        }else{
            if(req.body.password === req.body.cnfPassword){
                
                let hashPass = await bcrypt.hash(req.body.password,8)
                const user = new UserModel({email:req.body.email,password:hashPass})
                // console.log(user)
                const result = await user.save()
                
                res.status(200).send({data:result})
            }
            res.status(400).send({error:"Password does not match...!"})

        }


        
    } catch (err) {
        res.status(400).send({error:err.message})
        
    }

})

userRoute.post("/login",async(req,res)=>{

    let {email,password} = req.body

    try {
        let isUser = await UserModel.findOne({email:email})

        let decoded = await bcrypt.compare(password,isUser.password)
        console.log(decoded)

        if(!decoded){

            res.status(400).send({error:"Invalid Password or Username...!"})
        }
        if(decoded && email === isUser.email){

            const token = jwt.sign({userID:isUser._id},process.env.PRIVATEKEY)
            console.log(token)
            res.status(200).send({data:isUser,
            token})
            
        }
        
        
    } catch (err) {
        res.status(400).send({error:err.message})
        
    }
})

module.exports=userRoute