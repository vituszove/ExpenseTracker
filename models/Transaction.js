const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({

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
