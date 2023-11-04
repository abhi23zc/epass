const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const isAuthenticated = require('../middleware/Authenticated')

const secretKey = 'zrfisbest';

// Get Post Put 
router.get('/', isAuthenticated, (req, res)=>{
    res.send("Welcome to Home")
})
router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.send("Verify Data first!")
    }
    console.log(email ,password)
    let user = await User.findOne({email:email});
    if(!user){
        return res.send("Invalid 1!")
    }
    
    if(password == user.password){
        
        const token = jwt.sign({id: user._id}, secretKey);

        res.cookie('token', token, {
            maxAge: 900000, 
            httpOnly: false,
          });

        res.send({"token": token});

        console.log("Auth Succesfull");
    }
    else{
        res.send("Invalid !")

    }

    

})

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password)

    let user = await User.findOne({ email: email });
    if (user) {
        res.send({"msg" :"Already registered !"})
        console.log("Already registered !")
    }
    else {
        try {

            const n_user = new User({
                name,
                email,
                password
            })

            await n_user.save();
            res.send({"msg":"Succesfully registered"})
        } catch (e) {
            console.log(e);
            res.send({"msg" :"Something error occured"});
        }
    }

})

module.exports = router