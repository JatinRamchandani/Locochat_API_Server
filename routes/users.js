const e = require('express');
const express= require('express');
const path=require("path");
const fs=require('fs');
const router=express.Router();
const user=require('../models/users');



router.get('/getusers',async(req,res)=>{
    try{
        const allusers=await user.find();
        console.log(allusers);
        res.send(allusers);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})


router.post('/user',async(req,res)=>{
    const nuser =new user({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        password: req.body.password,
        socket_id: req.body.socket_id,
    });

    try{
        const newuser=await nuser.save()
        console.log(newuser);
        res.status(201).send({"result":"user added"});
    }catch(err){
        res.status(400).json({message : err.message});
    }
}) 


router.post('/locationupdate',(req,res)=>{

    let latitude=req.body.latitude;
    let longitude=req.body.longitude;
    let email=req.body.email;

        const updatedloc=async()=>{
            try{
                 const result=await user.updateOne({email: email},{
                     $set :{
                     latitude: latitude,   
                     longitude: longitude 
                 }
             });
     
             console.log(result);
             res.send({"result":"updated"});
            }catch(err){
                 res.status(400).json({message : err.message});
            }
         }
     
         updatedloc();
    
})  


router.post('/socketupdate',(req,res)=>{

    let socket_id=req.body.socket_id;
    let email=req.body.email;

        const updatedsoc=async()=>{
            try{
                 const result=await user.updateOne({email: email},{
                     $set :{
                     socket_id:socket_id
                 }
             });
     
             console.log(result);
             res.send({"result":"updated"});
            }catch(err){
                 res.status(400).json({message : err.message});
            }
         }
     
         updatedsoc();
    
}) 


router.post('/login',async(req,res)=>{

    let email=req.body.email;
    let password=req.body.password;

    console.log({"email":email,"pass":password});

         try{
            const thisuser=await user.find({email: email,password:password});
            console.log(thisuser);
            res.send(thisuser);
        }
        catch(err){
            res.status(500).json({message:err.message});
        }
     
    
}) 


module.exports=router