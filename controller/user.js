const { createToken } = require('../middleware/createToken');
const User=require('../models/user');
const jwt=require('jsonwebtoken');

const getUser=async(req,res)=>{
    res.render('signup')
}

const postUser=async(req,res)=>{
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(401).send({ message: 'All fields are required' });
        }

       const newUser= await User.create({ name, email, password });
       const token=createToken(newUser)
      return  res.cookie('token',token,{httpOnly:true}).redirect('/index');
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send({ message: 'Server error' });
    }
}

const getLogin=async(req,res)=>{
    res.render('login')
}

const postLogin=async(req,res)=>{
    try {
        const{email,password}=req.body;

        const user=await User.findOne({email})
        if(!user){
           return res.status(401).send('invalid user')
        }
        const isPassword=await  user.validatePassword(password)
        if(!isPassword){
           return res.status(401).send('invalid user')
        }
        const token= createToken(user)
       
      return  res.cookie('token',token,{httpOnly:true}).status(200).redirect('/index')       
    } catch (error) {
      return  res.status(500).send('server error')
    }
    
}

const getLogout=async(req,res)=> {
    res.clearCookie('token');
    res.redirect('/login');
  };

module.exports={getUser,postUser,getLogin,postLogin,getLogout}