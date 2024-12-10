const express=require('express')
const router=express.Router()

const userController=require('../controller/user')
const indexController=require('../controller/index')
const budgetController=require('../controller/budget')
const categoryController=require('../controller/category')
const accountController=require('../controller/account')
const financeController=require('../controller/finance')



router.get('/signup',userController.getUser);
router.post('/signup',userController.postUser);

router.get('/login',userController.getLogin);
router.post('/login',userController.postLogin);

router.get('/logout',userController.getLogout);

router.get('/index',indexController.getIndex)
router.post('/index',indexController.postIndex)
router.get('/edit-index/:id',indexController.getEditIndex)
router.post('/edit-index/:id',indexController.EditIndex)
router.get('/index/:id',indexController.deleteIndex)

router.get('/finance',financeController.getFinance)
router.post('/finance',financeController.postFinance)

router.get('/budgets',budgetController.getBudget);
router.post('/budgets',budgetController.postBudget)
router.get('/editBudgets/:id',budgetController.editBudget)
router.post('/editBudgets/:id',budgetController.postEditBudgets)
router.get('/deleteBudgets/:id',budgetController.deleteBudgets)

router.get('/categories',categoryController.getCategory)
router.post('/categories',categoryController.postCategory);
router.get('/editCategory/:id',categoryController.editCategories)
router.post('/editCategory/:id',categoryController.postEditCategories)
router.get('/deleteCategory/:id',categoryController.deleteCategories)

router.get('/account',accountController.getAccount);
router.post('/account',accountController.postAccount);
router.get('/editAccount/:id',accountController.editAccount);
router.post('/editAccount/:id',accountController.postEditAccount);
router.get('/deleteAccount/:id',accountController.deleteAccount);

module.exports=router