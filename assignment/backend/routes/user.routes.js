const {Router} = require("express");

const userController =  Router();
const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');
const {UserModel} = require("../models/UserModel")

userController.post("/signup", (req, res)=>{
    const {name , email, password ,  age} = req.body;
    bcrypt.hash(password, 5,async function(err, hash) {
        if(err){
            console.log("something went wrong..plz try again later")
        }
        const user =  new UserModel({
            name,
            email,
            password : hash,
            age
        })
        try{
            await user.save()
            res.send({msg :"signup successful"})
        }
        catch(err){
            console.log(err)
            res.send("something went wrong try agin")
        }
       
        // Store hash in your password DB.
    });
    
})

userController.post("/login", async(req, res)=>{
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    const hash = user.password
    bcrypt.compare(password, hash, function(err, result) {
        if(err){
            console.log("something went wrong..plz try again later")
        }
        if(result){
            const token =  jwt.sign({userId : user._id }, process.env.JWT_SECRET)
            res.send({message: "login successful", token})
           //res.send(token);
        }
        else{
            console.log("invalid credentials, plz signup if u havnt")
        }
        // result == true
    });
    
    
})

module.exports = {
    userController
}