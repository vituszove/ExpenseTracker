const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  income:{
    type:Number,
    default:0
  },
  expense:{
    type:Number,
    default:0
    
  },
  balance:{
    type:Number,
    default:0
  }
});

module.exports = User = mongoose.model("user", UserSchema);