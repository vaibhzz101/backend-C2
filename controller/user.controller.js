const {UserModel}= require('../model/user.model')
require('dotenv').config()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

exports.signup = async(req,res) =>{

    try {
        const { name, email, gender, password, role} = req.body;
        const isUserPresent = await UserModel.findOne ({ email })
        if (isUserPresent) return res.send("user already present, login please")
       const hash = await bcrypt.hashSync(password, 5)
    const newUser = new  UserModel({ name, email, gender, password: hash,role})
    await newUser.save();
    res.send("signup succesfull")

    } catch (error) {
        res.send({ err: error.message })
    }

}


exports.login = async (req, res) => {
   
    try {
        const { email, password } = req.body;
        const isUserPresent = await UserModel.findOne({ email })
        if (!isUserPresent) return res.send("user not prsent, register please");
      const isPasswordCorrect = await bcrypt.compareSync(
        password,
        isUserPresent.password
      );
      if(!isPasswordCorrect) return res.send("Invalid Credentials");
      const token = await jwt.sign({
        email,userID: isUserPresent._id, role:isUserPresent.role
      }, "authsecret",
      {expiresIn:"1m"})
           const refreshToken = await jwt.sign(
            {email, userID: isUserPresent._id},
            "refreshtokensecret",
            {expiresIn: "5m"}
           );
            res.send({ "message": "login success", token,refreshToken})
        
    
    } catch (error) {
        res.json({error : error.message })
    }
}

// Logout user and blacklist token
exports.logout= async (req, res) => {
  try {
    // Add token to blacklist collection
    const token = req.headers.authorization.split(' ')[1];
    const blacklistedToken = new BlacklistModel({ token });
    await blacklistedToken.save();

    res.status(200).send('Logged out successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};