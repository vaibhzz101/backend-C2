const {ProductModel} = require('../model/product.model')

exports.getall = async(req,res) =>{
    try {
        const posts = await BlogModel.find(  {userID : req.body.userID})
        res.json(posts)
    } catch (error) {
        res.json({msg : error.message})
    }
}

exports.add = async(req,res) =>{
    const {title ,body,device} = req.body;
    let role = req.body.role;
    try { 
        
        if(role !== 'seller'){
        res.json({msg : "usernote authorised"})
    }
 else{

 
        const newPost = new ProductModel({title ,price,decription,rating})
        await newPost.save()
        res.json({msg :" product added" })
 }   
    } catch (error) {
        res.json({msg : error.message })
    }
}

exports.delete = async(req,res) =>{
    const payload = req.body;
    const _id = req.params.id;
    const role = req.body.role;
    
    const prod = await ProductModel.find({_id})
    
    console.log(role ,prod);
    try {
        if(role !== 'seller'){
            res.json({msg : "usernote authorised"})
        }
        else{
             await ProductModel.findByIdAndDelete({_id})
            res.json({msg : "product deleted"})
        }
        
    } catch (error) {
        
        res.json({msg : error.message})
    }
}