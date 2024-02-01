const users = require("../models/userModel");






const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
    console.log("inside register API");
    const {username, email, password} = req.body
    console.log(username, email, password);
    try{
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("Account already exists... Please login")
        }else{
            //add user to collection
            const newUser = new users({
                username, email, password, profile:"", github:"", linkedin:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.login = async(req,res)=>{
    console.log("inside login API");
    const {email, password} = req.body
    console.log(email, password);
    try{
        const existingUser = await users.findOne({email, password})
        console.log(existingUser);
        if(existingUser){
            const token = jwt.sign({userID:existingUser._id}, process.env.JWT_SECRET_KEY)
            res.status(200).json({existingUser, token})
        }else{
           res.status(404).json("invalid Email / Password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}