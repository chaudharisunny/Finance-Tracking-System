const Category=require('../models/category')


const getCategory=async(req,res)=>{
    try {
        const incomeCategories=await Category.find({type:'income'})
        const expenceCategories=await Category.find({type:'expence'})
        res.render('categories',{incomeCategories,expenceCategories}) 
      
             
    } catch (error) {
        res.status(500).send('server error')
    }
}

const postCategory=async(req,res)=>{
    try {
        const { name, type, desc } = req.body;

        // Validate required fields
        if (!name || !type || !desc) {
            return res.status(400).send('All fields are required');
        }

        // Find the category by name and type
        let category = await Category.findOne({ name, type }); // Use `await` to get the document

        // If the category doesn't exist, create a new one
        if (!category) {
            category = new Category({ name, type, entries: [] });
        }

        // Push the description to the `entries` array
        category.entries.push({ desc }); // Push to the array of the document instance

        // Save the category
        await category.save();

        res.redirect('/categories')
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const editCategories=async(req,res)=>{

    try {
        const incomeCategories=await Category.find({type:'income'})
        const expenceCategories=await Category.find({type:'expence'})
        const category = await Category.findById(req.params.id);
        res.render('editCategory', {incomeCategories,expenceCategories, category });
      } catch (error) {
        console.error('Error fetching category for editing:', error);
        res.status(500).send('Server error');
      }
    
}

const postEditCategories=async(req,res)=>{
    try {
        const { name, type, desc } = req.body;
        await Category.findByIdAndUpdate(req.params.id, { name, type, desc });
        res.redirect('/categories');
      } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).send('Server error');
      }
}

const deleteCategories=async(req,res)=>{
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.redirect('/categories');
      } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).send('Server error');
      }
}
module.exports={getCategory,postCategory,editCategories,postEditCategories,deleteCategories}