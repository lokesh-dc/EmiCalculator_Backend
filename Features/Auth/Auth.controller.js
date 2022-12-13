const express = require("express");
const users = require("./Auth.schema");

const app = express.Router();

app.get("/", async (req, res)=>{
    let u = await users.find();
    res.send(u);
})



module.exports = app;