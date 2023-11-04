const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const db = require('./db/config')
const PORT = process.env.PORT || 80
const cookieParser = require('cookie-parser');
const cors = require('cors')

db();

const corsOptions = {
    origin: true, 
    credentials: true, 
}; 
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/auth', require('./routes/Auth'))
app.use('/', require('./routes/Pass'))
app.use('/test', (req, res)=>{
    res.send("API is working")
})
app.listen(PORT, ()=>{
    console.log("Server Started on port" + PORT)
})