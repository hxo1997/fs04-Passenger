const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const router = express.Router();
const {
    User
} = require("../models/users");

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

const register = (req, res, next) => {
    const {
        email,
        password,
        fullName,
        userType,
        phone,
        DOB
    } = req.body;


    // check whether if input is valid
    User.findOne({
            $or: [{
                email
            }, {
                phone
            }]
        })
        .then(user => {
            if (user) return Promise.reject({
                errors: "Email or phone is exist"
            })
            const newUser = new User({
                email,
                password,
                fullName,
                userType,
                phone,
                DOB
            })
            bcrypt.genSalt(10, (err, salt) => {
                if (err) return Promise.reject(err);

                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) return Promise.reject(err);
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.status(200)
                            .json(user))
                        .catch(err => res.status(400)
                            .json(err))

                })
            })
        })
        // const newUser = new User({
        //     email,password,fullName,userType,phone,DOB
        // })
        // newUser.save()
        .catch(err => res.status(400).json())

}
// route POST /api/users/login
// desc login
// access PUBLIC

const login = (req, res, next) => {
    const {
        email,
        password
    } = req.body;


    User.findOne({
            email
        })
        .then(user => {
            if (!user) return Promise.reject({
                errors: "User does not exist"
            })

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (!isMatch) return res.status(400).json({
                    errors: "wrong password"
                })

                const payload = {
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                    userType: user.userType
                }
                jwt.sign(payload, "Cybersoft", {
                    expiresIn: "1h"
                }, (err, token) => {
                    if (err) return res.status(400).json(err)

                    return res.status(200).json({
                        message: "success",
                        token
                    })
                })
                // res.status(200).json({
                //     message:"success"
                // })
            })
        })
        .catch(err => res.status(400).json(err))
}

//     // route POST /api/users/test-privates
//     // desc test-private
//     // access Private (only allow logined users to access)

const testPrivate = (req, res, next) => {
    res.status(200).json({
        message: "you see it"
    })
}
const uploadAvatar = (req, res, next) => {
    const {id} = req.user;
        User.findById(id)
            .then(user => {
                if(!user) return Promise.reject({errors: "error"})
                user.avatar = req.file.path
                return user.save()
            })
            .then(user => res.status(200).json(user))
            .catch(err => res.status(400).json(err))
}

// router.get("/test-private", authenticating,authorizing(["admin"]), (req,res) => {
//     res.status(200).json({message: "you see it"})
// })

module.exports = {
    register,
    login,
    testPrivate,
    uploadAvatar
};