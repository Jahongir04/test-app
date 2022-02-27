const { Schema, model}=require("mongoose");
const mongoose=require('mongoose');
const userSchema= new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }]
});
const User = model("User", userSchema); 
module.exports=User;