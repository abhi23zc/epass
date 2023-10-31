require('dotenv').config()
const mongoose = require('mongoose')

const db_connect = async () =>{
    const db_url = process.env.mongo_uri;
    try{

        await mongoose.connect(db_url);
        console.log("Database connected Succesfully");
    }catch(e){
        console.log(e);
    }
}

module.exports = db_connect;
