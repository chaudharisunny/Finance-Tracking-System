const Finance=require('../models/finance');
const Report=require('../models/report');

const getFinance=async(req,res)=>{
   
    
    const shwFinance=await Report.find()
   const incomeCategory=await Report.find({type:'income'}).sort({name:1})
   const expenseCategory=await Report.find({type:'expense'}).sort({name:1})
    const chartData = {
        labels: shwFinance.map(item => item.category),
        data:  shwFinance.map(item => item.amount),
    };

    res.render('finance',{incomeCategory,expenseCategory,chartData,finance:shwFinance})
   
    
}
const postFinance=async(req,res)=>{
    try {
        const {type,category,amount,balance,date}=req.body

        if(!type||!category||!amount||!balance||!date){
          return  res.status(400).send('all fields are required')
        }
        const newFinance=await Finance.create({type,category,amount,balance,date})
        return res.redirect('/finance')
    } catch (error) {
        console.log(error);
        
    }
   
}

module.exports={getFinance,postFinance}