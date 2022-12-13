const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    email : { type: String, unique: true, required: true },
    name : { type: String, required: true },
    password: { type: String, required: true }
});


const users = mongoose.model("user",usersSchema);

module.exports = users;