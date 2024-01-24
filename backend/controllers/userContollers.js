const express = require('express');
const userModel = require('../models/userModel');
const send = require('../utils/sendEmail');
const otpModel = require('../models/userOtp');

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
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const data = {
          "to": newUser.email,
          "from": process.env.SENDER_EMAIL,
          "subject": "Otp for Email Verification",
          "text": `The otp given below will expire after 1 hour otp -> ${otp}`
        };
        const retunreddata = await send(data);
        if(retunreddata.status_code == 400){
            return res.status(400).json(retunreddata.error);
        }
        const options = { upsert: true, setDefaultsOnInsert: true };
        const otpdata = new otpModel({
            user_id: newUser._id,
            otp,
            options
        })
        await otpdata.save();
        return res.status(200).json("Please check ur email for verification code");
    } catch(err){
        return res.status(500).json({
            error: err
        })
    }
}

const verifyOtp = async(req, res) => {
    try{
        const {user_id, otp} = req.body;
        const userexist = await otpModel.findOne({ user_id: user_id });
        if (!userexist) {
          return res.status(400).json({
            error: "User doesn't exist"
          })
        }
        if(otp === userexist.otp){
            const user = await userModel.findByIdAndUpdate(
              user_id,
              {
                emailVerified: true,
              },
              { new: true }
            );
            await otpModel.deleteOne({ user_id });
            return res.status(200).json("Email verified successfully.")
        }
        return res.status(400).json({
            "error": "Otp is wrong. Please try again!"
        })
    } catch(err){
        return res.status(500).json({
            error: err
        })
    }
}

const sendEmailOtp = async(req, res) => {
    try{
        const {user_id} = req.body;
        const user_exist = await userModel.findById(user_id)
        if(!user_exist){
            return res.status(400).json({
                error: "User doesn't exists"
            })
        }
        if(user_exists.emailVerified){
            return res.status(400).json({
              error: "Email already verified",
            });
        }
        const user_exist_otpModel = await otpModel.findOne({user_id});
        if(user_exist_otpModel){
            return res.status(400).json({
                "error": "Your last generated otp is not expired. Try after some time!"
            })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const data = {
          to: user_exist.email,
          from: process.env.SENDER_EMAIL,
          subject: "Otp for Email Verification",
          text: `The otp given below will expire after 1 hour otp -> ${otp}`,
        };
        const retunreddata = await send(data);
        if (retunreddata.status_code == 400) {
          return res.status(400).json(retunreddata.error);
        }
        const options = { upsert: true, setDefaultsOnInsert: true };
        const otpdata = new otpModel({
          user_id,
          otp,
          options,
        });
        await otpdata.save();
        return res
          .status(200)
          .json("Please check ur email for verification code");
    } catch(err){
        res.status(500).json({
            "error": err
        })
    }
}

const userLogin = async(req, res) => {
    try{
        const {email, password} = req.body;
    } catch(err){
        return res.status(500).json({
            error: err
        })
    }
}

module.exports = {
    userSignup,
    userLogin,
    verifyOtp,
    sendEmailOtp
};