const express  = require("express")
require('dotenv').config()
const {BlacklistModel} = require('../models/blacklist.model')
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authentication = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        // checking for blacklisted token
        const isBlacklisted = await BlacklistModel.findOne({token});
        if(isBlacklisted){
            return res.status(401).send('Token is Blacklisted');
        }
        
        
        const decoded = jwt.verify(token, JWT_SECRET_KEY)
        const { userID} = decoded;

        //  check if the user exists
        const user = await UserModel.findById(userID);
        if(!user){
            return res.status(401).json({message: 'Unauthorised'});
        }
        // attach the user to the request object
        req.user = user;
   
        next()
       }
  
     catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send('Access token expired');
          }
          return res.status(401).json({ message: 'Unauthorized' });
        }
      
}

module.exports = authentication