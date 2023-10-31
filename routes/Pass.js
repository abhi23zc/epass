const router = require('express').Router()
const cred = require('../models/Pass_model')
const isAuthenticated = require('../middleware/Authenticated')
router.post('/', isAuthenticated,async(req, res)=>{

    const {password, domain} = req.body;

    try{

        console.log(password, domain)
        let credentials= new cred({password:password, domain:domain, user:req.user.id});
        await credentials.save();
        res.send("Credentials saved succesfully");
    }catch(e){
        console.log(e)
    }


})

router.get('/', isAuthenticated , async(req, res) =>{

    let credentials= await cred.find({user:req.user.id});
    res.json(credentials)
})

module.exports = router;