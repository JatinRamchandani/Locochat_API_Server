const express=require('express');
const bodyParser=require('body-parser');
const path=require("path");
const { urlencoded } = require('body-parser');
const app=express();
const { query } = require('express');
const mongoose= require('mongoose');
const dotenv=require('dotenv').config();
const port=process.env.PORT || 8000;

const usersRouter=require('./routes/users');

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology: true})

const db=mongoose.connection
db.on('error',(error)=> console.log(error));
db.once('open',()=>console.log("Connected to database"));

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/public',express.static(path.join(__dirname,'static')));
app.use('/api/users',usersRouter)



app.listen(port,()=>{
    console.log(`Website running on port ${port}`);
});