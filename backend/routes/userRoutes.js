const express = require('express');
const { userSignup, userLogin, verifyOtp, sendEmailOtp } = require('../controllers/userContollers');
const router = express.Router();

router.post('/signup', userSignup);
router.post("/verify-otp", verifyOtp);
router.post('/login', userLogin);
router.post('/send-otp', sendEmailOtp)

module.exports = router;
