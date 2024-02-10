const express = require('express')
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "sushantisagoodb$oy"

// Rouute 1 : create a new user using : post "http://localhost:5000/api/auth/createuser" no login required
router.post('/createuser',[
    body('name', 'Enter a vailid name').isLength({min:2}),
    body('email','enter a vailid email').isEmail(),
    body('password', 'Enter a vailid password').isLength({min:5})
], async (req,res)=>{
    // if there are errors create a bad request and the error
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors: errors.array()})
    }

    try {
         // check weather the user already exists with this email 
        let user = await User.findOne({emial: req.body.email});
    if(user){
        return res.json({success,error : 'Sorry the user with this email is already exists'})
    }
     
    // generate the password salt
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password , salt);
    // create new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass
    })
      const data ={
        user:{
            id: user.id
        }
      } 
      success = true;
      const authToken = jwt.sign(data , JWT_SECRET);
      res.json({success,authToken});

            
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }    
})


// Route 2 : Authenticate a user using : post "http://localhost:5000/api/auth/login" no login required
router.post('/login',[
    body('email','enter a vailid email').isEmail(),
    body('password', 'password can not be blank').exists()
], async (req,res)=>{
       // if there are errors create a bad request and the error
       let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
     
    const { email , password} = req.body
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success,message:"please login with correct credentials"})
        }

        let passCompare = await bcrypt.compare(password , user.password);
        if(!passCompare){
            return res.status(400).json({success,message:"please login with correct credentials"})
        }
        
        const data ={
            user:{
                id: user.id
            }
          } 
          const authToken = jwt.sign(data , JWT_SECRET);
          success = true;
          res.json({ success,authToken});
        

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }   

})

// Route 2 : Get loggedin user detail  using : post "http://localhost:5000/api/auth/getuser"  login required
router.post('/getuser', fetchuser, async (req,res)=>{
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }   

})
module.exports = router