const mongoose=require('mongoose');
import{model} from 'mongoose';
const roleSchema=new mongoose.Schema({
    name: { type: String, required: true, unique: true }
})
const Role=model("Role" , roleSchema);
module.exports=Role;