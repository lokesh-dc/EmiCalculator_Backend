const express = require("express");

const databaseConnect = require("./Config/dbConnect")
const authController = require("./Features/Auth/Auth.controller");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authController)


app.post("/calculateemi", async(req,res)=>{
    const {amount, interest, tenure} = req.body;
    try{
        const r = ( interest / 12 ) / 100;
        let emi = Math.ceil((+amount * +r * Math.pow((1 + +r), +tenure) ) / (Math.pow((1 + +r),tenure) - 1));
        const totalPayable = emi * tenure;
        const interestPayable = totalPayable - amount
        res.status(200).send({"EMI": emi, totalPayable, interestPayable});
    }catch(e){
        res.status(500).send(e.message)
    }   
})

app.get("/", async (req, res) =>{
    res.send("Working fine");
})


app.listen((8080), async ()=>{
    await databaseConnect();
    console.log("Listening on http://localhost:8080");
})