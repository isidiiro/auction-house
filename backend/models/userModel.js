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
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = model("User", MySchema);

module.exports = userModel;
