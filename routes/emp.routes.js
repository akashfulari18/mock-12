const express = require('express')
const mongoose = require('mongoose')
const EmpModel = require('../model/employees.model')

const empRoute = express.Router()

empRoute.get("/", async (req, res) => {

    try {
        let emps = await EmpModel.find()
        if (emps.length > 0) {

            res.status(200).send({ data: emps })
        } else {

            res.status(400).send({ error: "No Emplyoee found...!" })
        }
    } catch (err) {

        res.status(400).send({ error: err.message })
    }
})
empRoute.post("/add", async (req, res) => {

    const {email} = req.body
    // console.log("body",req.body)

    try {

        let isPresent = await EmpModel.findOne({ email })

        // console.log(isPresent)
        if (isPresent) {
            res.status(400).send({ error: "user already exists...!" })
        } else {
            const emp = new EmpModel(req.body)
            // console.log(emp)
            const result = await emp.save()

            res.status(200).send({ data: result })
        }



    } catch (err) {
        res.status(400).send({ error: err.message })

    }

})

empRoute.delete('/delete/:id',async(req,res)=>{
let {id}=req.params
    try {
        
        const emp =  await EmpModel.findByIdAndDelete({_id:id})
        res.status(200).send({data:emp,msg:"Employee has been deleted"})
        
        
    } catch (err) {
        res.status(400).send({error:err.message})
        
        
    }
})

empRoute.patch('/update/:id',async(req,res)=>{
    
    let {id} = req.params
    
    try {
        
        const emp =  await EmpModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({data:emp,msg:"Employee has been updated"})
        
        
    } catch (err) {
        
        res.status(400).send({error:err.message})
    }
})

module.exports = empRoute