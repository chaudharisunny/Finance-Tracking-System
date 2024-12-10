const{ mongoose}=require('mongoose')

const accountSchema=new mongoose.Schema({
    amount:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("account",accountSchema)