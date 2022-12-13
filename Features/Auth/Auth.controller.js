const express = require("express");
const users = require("./Auth.schema");

const app = express.Router();

app.get("/", async (req, res)=>{
    let u = await users.find();
    res.send(u);
})

app.get("/profile", async(req,res)=>{
    let {token} = req.headers;
    try{
        if(token){
            const [id,email,password] = token.split(":");
            let checkCreds = await users.findById(id)
            if(checkCreds.email===email && checkCreds.password===password){
                return res.send({stat: true,creds: checkCreds});
            }
    
            return res.status(404).send({stat: false, message:"Bad Credentials"});
        }
    }catch(e){
        res.status(500).send(e.message);
    }
})

app.post("/signup", async (req, res)=>{

    const {email, name, password} = req.body;
    try{
        let isEmailPresent = await users.findOne({email});
        if(isEmailPresent){
            return res.status(401).send({stat:false, message:"Email Id already exists"});
        }

        let newUser = await users.create({email, name, password});
        res.send({stat: true, token : `${newUser.id}:${newUser.email}:${newUser.password}`});
    }catch(e){
        res.status(500).send(e.message);
    }
})


app.post("/login", async (req, res)=>{
    const {email, password } = req.body;
    try{
        let findUser = await users.findOne({email, password});
        if(!findUser){
            return res.status(404).send({stat: false,message: "Bad Credentials"});
        }

        res.send({stat: true,token : `${findUser.id}:${findUser.email}:${findUser.password}`});
    }catch(e){
        res.status(500).send(e.message);
    }
})


module.exports = app;