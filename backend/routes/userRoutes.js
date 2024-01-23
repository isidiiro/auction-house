const express = require('express');
const { userSignup, userLogin, verifyOtp } = require('../controllers/userContollers');
const router = express.Router();

router.post('/signup', userSignup);
router.post("/verify-email", verifyOtp);
router.post('/login', userLogin);

module.exports = router;
