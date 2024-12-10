const Budget=require('../models/budget')
const Category=require('../models/category')
const getBudget=async(req,res)=>{
    try {
      if(!req.user){
        res.status(404).send('unauthorized')
             }
             const addCategory = await Category.find(); // Fetch categories
             const newBudget = await Budget.find().populate('category'); // Fetch budgets and populate category
            console.log(newBudget);
            
    
             res.render('budgets', { addBudget: newBudget, showCat: addCategory });
     
       
      } catch (error) {
        console.error('Error fetching budgets:', error);
        res.status(500).send('Server error');
      }
}

const postBudget=async(req,res)=>{
    try {
        const{limit,category}=req.body 
        if(!limit||!category){
            return res.status(400).send('all fields are required..')
        }
        await Budget.create({limit,category,user:req.user._id})
       return res.redirect('/budgets') 
    } catch (error) {
        res.status(500).send(error)

    }
}

const editBudget=async(req,res)=>{
    try {
        const { id } = req.params;
    
        // Find the budget by ID and populate the category
        const budgetToEdit = await Budget.findById(id).populate('category');
    
        if (!budgetToEdit) {
          return res.status(404).send('Budget not found');
        }
    
        // Fetch all categories for the dropdown menu
        const categories = await Category.find();
    
        // Render the edit form with the fetched budget and categories
        res.render('editBudgets', { budget: budgetToEdit, showCat: categories });
      } catch (error) {
        console.error('Error fetching budget for editing:', error);
        res.status(500).send('Server error');
      }
}

const postEditBudgets=async(req,res)=>{
    try {
        const { id } = req.params;
        const { category, limit,} = req.body;
    
        // Update the budget in the database
        const updatedBudget = await Budget.findByIdAndUpdate(
          id,
          { category, limit },
          { new: true }
        );
    
        if (!updatedBudget) {
          return res.status(404).send('Budget not found');
        }
    
        res.redirect('/budgets'); // Redirect back to the budgets list
      } catch (error) {
        console.error('Error updating budget:', error);
        res.status(500).send('Server error');
      }
}

const deleteBudgets=async(req,res)=>{
    try {
        const { id } = req.params;
    
        // Find and delete the budget
        const deletedBudget = await Budget.findByIdAndDelete(id);
    
        if (!deletedBudget) {
          return res.status(404).send('Budget not found');
        }
    
        res.redirect('/budgets'); // Redirect to the budgets list after deletion
      } catch (error) {
        console.error('Error deleting budget:', error);
        res.status(500).send('Server error');
      }
}


module.exports={getBudget,postBudget,editBudget,postEditBudgets,deleteBudgets}