const express = require("express")
const {connection} = require('./config/db')
const {authentication} = require('./middleware/authenticater')
const {userRouter} = require('./routes/user.routes')
const {productRouter} = require("./routes/products.routes")
require('dotenv').config();

const app = express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('homeroute of backend')
})

app.use('/users',userRouter)
app.use(authentication)

app.use('/products', productRouter)





app.listen(process.env.port,()=>{
    try{
        connection;
        console.log("server running at port"+ process.env.port)
    }
    catch(err){
        console.log({error:err.message})

    }
})