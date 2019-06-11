const express = require("express");
const router = express.Router();
const {User} = require("../models/users");

//Middleware
// router.get("/xyz", (req, res,next) => {
//     // res.json({message: "Hello"})
//     console.log("MDW 1")
//     next()
// }, (req,res,next) => {
//     console.log("MDW 2")
//     next()
// }, (req,res) => {
//     res.send("Hello world")
//    // res.send("Hello") // can't set header after first
// })

// rout POST /api/users/register
// desc register new user
// access PUBLIC

router.post("/register", (req,res)=> {
    const {email, password, fullName, userType, phone, DOB} = req.body;

    const newUser = new User({
        email,password,fullName,userType,phone,DOB
    })
    newUser.save()
        .then(user=>res.status(200)
        .json(user))
        .catch(err=>res.status(400)
        .json(err))
}) 
module.exports = router;