const express = require("express");

const databaseConnect = require("./Config/dbConnect")
const authController = require("./Features/Auth/Auth.controller");

const app = express();

app.use(express.json());

app.use("/auth", authController)

app.get("/", async (req, res) =>{
    res.send("Working fine");
})



app.listen((8080), async ()=>{
    await databaseConnect();
    console.log("Listening on http://localhost:8080");
})