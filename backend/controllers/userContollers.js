const express = require('express');
const userModel = require('../models/userModel');
const send = require('../utils/sendEmail')

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
        const data = {
          "to": newUser.email,
          "from": process.env.SENDER_EMAIL,
          "subject": "Otp for Email Verification",
          "text": Math.floor(100000 + Math.random() * 900000).toString()
        };
        const retunreddata = await send(data);
        console.log(retunreddata)
        if(retunreddata.status_code == 400){
            return res.status(400).json(retunreddata.error);
        }
        return res.status(200).json("Please check ur email for verification code");
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