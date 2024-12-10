const Account=require('../models/account');

const getAccount = async (req, res) => {
    try {
        if(!req.user){
            res.status(404).send('unauthroized')
        }
        const newAccount = await Account.find({user:req.user._id}); // Fetch accounts from the database
        res.render('account', { createAcc: newAccount }); // Pass to EJS      

        } catch (error) {
      console.error('Error fetching accounts:', error);
      res.status(500).send('Server error');
    }
  };
  

const postAccount=async(req,res)=>{
    try {
        const{amount,name}=req.body;
        if(!amount||!name){
            res.status(401).send('all fields are required')
        }
        Account.create({amount,name})  
        res.render('account')  
    } catch (error) {
        res.status(500).send('server error' + error)
    }
    
}

const editAccount=async(req,res)=>{
    try {
         const{id}=req.params
        const newAccount=await Account.findById(id)
        res.render('editAccount',{editAcc:newAccount})
            
    } catch (error) {
        res.status(500).send('server error' + error)
    }
}

const postEditAccount=async(req,res)=>{
    try {
        const{id}=req.params
        const{amount,name}=req.body
        const editAccount=await Account.findByIdAndUpdate(id,{amount,name},{new:true})
        
        if(!editAccount){
            res.status(404).json({message:'account is not edit'})
        }

        return res.redirect('/account')
        
    } catch (error) {
        res.status(500).send('server error' + error)
    }
}

const deleteAccount=async(req,res)=>{
    try {
        const{id}=req.params
        const deleteAcc=await Account.findByIdAndDelete(id)

        if(!deleteAcc){
            res.status(404).json({message:'acc is not delete'})
        }

        return res.redirect('/account')
    } catch (error) {
        res.status(500).send('server error' + error)
    }
}
module.exports={getAccount,postAccount,editAccount,postEditAccount,deleteAccount}