const Category=require('../models/category')
const Report=require('../models/report')
const Account=require('../models/account');
const report = require('../models/report');



const getIndex= async(req,res)=>{
    const incomeCategories=await Category.find({type:'income'}).sort({name:1})
    const expenseCategories=await Category.find({type:'expence'}).sort({name:1})
    const showReport=  await Report.find()
    const addAcc=await Account.find()

    res.render('index',{incomeCategories,expenseCategories,addReport:showReport,account:addAcc,
        user:req.user
    })
   
}

const postIndex=async(req,res)=>{
    try {
        const{notes,type,amount,account,category}=req.body

        if(!notes||!type||!amount||!account||!category){
          return  res.status(400).send('all fields are required')
        }
       let balance
       const reportAmount=Report.findOne({amount})
       if(!reportAmount){
        res.status(400).json({message:'report for amount is not found'})
       }
       const accountAmount=Account.findOne({amount})
       if(!accountAmount){
        res.status(400).json({message:'account for amount is not found'})
       }

       if(type==='credit'){
       balance=reportAmount.amount+accountAmount.amount
        console.log(balance);
        
       }else if(type=='debit'){
       const newbalance=reportAmount.amount-accountAmount.amount
       console.log(newbalance);   
    }
       
       
       Report.create({notes,type,amount,account,category})
    
        res.redirect('/index')    
    } catch (error) {
        res.status(500).send('server error'+error)
    }
}

const getEditIndex=async(req,res)=>{
    const { id } = req.params; // Get the ID from the URL
  try {
    const report = await Report.findById(id); // Fetch the report from the database
    if (!report) {
      return res.status(404).send('Report not found');
    }
    const incomeCategories = await Category.find({ type: 'income' }).sort({ name: 1 });
    const expenseCategories = await Category.find({ type: 'expence' }).sort({ name: 1 });
    const accounts = await Account.find();

    // Render the edit page with existing data
    res.render('edit-index', { report, incomeCategories, expenseCategories, accounts });
  } catch (error) {
    res.status(500).send('Server error');
  }
   
}

const EditIndex=async(req,res)=>{
    const { id } = req.params;
    const { type, account, category, notes, amount } = req.body; // Extract updated data from form
  
    try {
      const report = await Report.findByIdAndUpdate(
        id,
        { type, account, category, notes, amount },
        { new: true } // Return the updated document
      );
  
      if (!report) {
        return res.status(404).send('Report not found');
      }
  
      res.redirect('/index'); // Redirect to the homepage or report listing
    } catch (error) {
      res.status(500).send('Server error');
    }
}

const deleteIndex=async(req,res)=>{
    const { id } = req.params; // Get the report ID from the URL
  try {
    const deletedReport = await Report.findByIdAndDelete(id); // Delete the report by ID
    if (!deletedReport) {
      return res.status(404).send('Report not found');
    }
    res.redirect('/index'); // Redirect back to the main page or wherever you need
  } catch (error) {
    res.status(500).send('Server error');
  }
}

module.exports={getIndex,postIndex,getEditIndex,EditIndex,deleteIndex}