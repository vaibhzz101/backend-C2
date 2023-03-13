const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
    type: String,
    required:true,
   
 },
    email :  {
        type: String,
        required:true,
        unique:true
     },
    gender : {
        type: String,
        required:true,
       
     },
    password : {
        type: String,
        required:true,
       
     },
     role : {
      type: String,
      required:true,
      default:CustomElementRegistry,
      enum:[seller,provider]
     
   }

})

const UserModel = mongoose.model('user',userSchema)

module.exports ={
   UserModel
} 