const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Transaction = require("../../models/Transaction");


// @route post api/transaction
// @desc add a new transaction
// @access private

router.post('/',[check('amount','Amount is required').not().isEmpty()], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    const newTrans = new Transaction({
        amount:req.body.amount
    })
    const transaction = await newTrans.save();
        res.json(transaction)
        console.log(res.body.amount)
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// @route GET api/transaction
// @desc add a new transaction
// @access private

router.get("/", async (req, res) => {
    try {
      const transactions = await Transaction.find().sort({ date: -1 }); //Descending 
      res.json(transactions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  });
module.exports = router;