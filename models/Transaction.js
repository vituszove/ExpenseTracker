const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TransactionSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now
  },
  amount:{
    type: Number,
    required:true
  }
});

module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
