const { Schema, model } = require("mongoose");

const MySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 10
  }, 
  pic: {
    type: String
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  emailVerified: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const userModel = model("User", MySchema);

module.exports = userModel;
