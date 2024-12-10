const {mongoose,Schema}=require('mongoose')

const budgetSchema=new mongoose.Schema({
    limit:{
        type:String,
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    }
},{timestamps:true})

module.exports=mongoose.model("budget",budgetSchema)