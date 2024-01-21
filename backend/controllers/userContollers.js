const express = require('express');
const userModel = require('../models/userModel');

const userSignup = async(req, res) => {
    try{
        const {name, email, password, pic} = req.body;
        const emailexist = await userModel.findOne({ email })
        if(emailexist){
            return res.status(400).json({
                error: "Email already registered!"
            })
        }
        if(password.length < 10){
            return res.status(400).json({
                error: "Password is too short!"
            })
        }
        const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).+$/;
        if(!regex.test(password)){
            return res.status(400).json({
                error: "Password not string enough!"
            })
        }
        const newUser = new userModel({
            name,
            email,
            password, 
            pic
        });
        await newUser.save();
        
    } catch(err){
        return res.status(500).json({
            error: err
        })
    }
}

const userLogin = async(req, res) => {

}

module.exports = {
    userSignup,
    userLogin
};