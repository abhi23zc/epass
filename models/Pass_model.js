const mongoose = require('mongoose')
const {Schema} = mongoose;

const PassSchema = new Schema({
    
    password:String,
    domain:String,
    user: {
        type: mongoose.Schema.Types.ObjectId, // This assumes "user" will be an ObjectId referencing another document
        ref: 'USER', // The name of the model being referenced (replace with your actual model name)
      }
})

module.exports = mongoose.model('CRED', PassSchema);