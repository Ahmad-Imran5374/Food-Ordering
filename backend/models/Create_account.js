const mongoose=require('mongoose')

const Create_accountSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    adress:String,
    gender:String,
    password:String,
    role:{
        type:String,
        default:'user'
    }

})

const create_account=mongoose.model("create_account",Create_accountSchema)
module.exports=create_account