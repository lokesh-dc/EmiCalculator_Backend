const mongoose = require("mongoose");


const databaseConnect = async ()=>{
    return mongoose.connect("mongodb+srv://lokesh:prashant9172@cluster0.tmkdxff.mongodb.net/database")
}

module.exports = databaseConnect;