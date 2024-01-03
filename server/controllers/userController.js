
const User  = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { hashedPassword,comparePassword } = require('../helper/auth');
const generateToken = require('../helper/generateToken');



//********** USER REGISTER **********//

module.exports.signup = async (req, res) => {
  const {firstName,lastName, email, password} = req.body;
  if(!firstName || !lastName || !email || !password) {
    res.status(400).json('Please fill all fields..')
  }
  try {
    const hashedPass = await hashedPassword(password)
    const user = await User.create({
      firstName,
      lastName ,
      email ,
      password : hashedPass,
    });
    
    if(user){
      generateToken(res,user._id)
      res.status(200).json({
        _id : user._id,
        firstName : user.firstName,
        lastName : user.lastName,
        email : user.email,
      })
    }else{
      res.status(400).json('Invalid data')
    }

    // res.status(201).json({message : 'Registration Success.'})
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}



  
//********** USER LOGIN **********//
module.exports.login = async (req, res) =>{
  const {email,password} = req.body;
  const user = await User.findOne({email})
  if(user && (await user.matchPassword(password))){
    generateToken(res,user._id);
    res.status(201).json({
      _id : user._id,
      firstName : user.firstName,
      lastName : user.lastName,
      email : user.email,
    })
  }else{
    res.status(400).json('Invalid data')
  }
}



//********** USER GET INFORMATION **********//
module.exports.getProfile = async (req, res) =>{ 
    const user = {
      _id:  req.user._id,
      firstName:  req.user.firstName,
      lastName:  req.user.lastName,
      email:  req.user.email,
    }

    res.status(200).json(user);
}

//********** USER UPDATE THEIR INFORMATION **********//
module.exports.updateProfile = async (req, res) =>{    
 
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
 
  
}



//********** USER LOGOUT **********//
module.exports.logout = (req, res) =>{    
    res.cookie('jwttoken','', {
        httpOnly : true,
        expires : new Date(0)
    });
    res.status(200).json({message:'User logout'})
}