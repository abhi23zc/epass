const router = require('express').Router()
const cred = require('../models/Pass_model')
const isAuthenticated = require('../middleware/Authenticated')
router.post('/', isAuthenticated,async(req, res)=>{

    const {password, domain} = req.body;

    try{

        console.log(password, domain)
        let credentials= new cred({password:password, domain:domain, user:req.user.id});
        await credentials.save();
        res.json({"message":"Credentials saved succesfully"});
    }catch(e){
        console.log(e)
    }


})

router.put("/", isAuthenticated , async(req, res)=>{
    try{
        // console.log(req.body.uid)

        await cred.deleteOne({_id:req.body.uid})
        return res.json({"message":"Document Deleted"})
    }catch(e){
        return res.json({"error":"Error while deleting"})
    }
})

router.get('/', isAuthenticated , async(req, res) =>{

    let credentials= await cred.find({user:req.user.id});
    res.json(credentials)
})

module.exports = router;