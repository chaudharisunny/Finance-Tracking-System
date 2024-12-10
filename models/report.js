const{Schema,mongoose}=require('mongoose')
const account = require('./account')

const reportSchema=new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    notes:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    account:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }, 
    category:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("report",reportSchema)