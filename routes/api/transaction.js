const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Transaction = require("../../models/Transaction");
const auth = require('../../middleware/auth');
const User = require("../../models/User");

// @route post api/transaction
// @desc add a new transaction
// @access private

router.post('/',auth,[check('amount','Amount is required').not().isEmpty().isNumeric(),check('category','Category is required').not().isEmpty()], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
     
    const newTrans = new Transaction({
        amount:req.body.amount,
        user:req.user.id,
        category:req.body.category
    })
    const user = await User.findById(req.user.id).select('-password');
    if(req.body.amount.charAt(0) === '-'){
      user.expense -= req.body.amount
      await user.save()
    }else{
      let userIncome = parseFloat(user.income) + parseFloat(req.body.amount);
      user.income = userIncome;
      await user.save();
    }
      user.balance = user.income - user.expense;
      await user.save();

    const transaction = await newTrans.save();
        res.json(transaction)
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// @route GET api/transaction
// @desc Get All Transaction
// @access private

router.get("/",auth, async (req, res) => {
    try {
      const transactions = await Transaction.find({'user':req.user.id}).sort({ date: -1 }); //Descending 
    if(transactions.length === 0 || !transactions){
      return res.status(404).json({msg:"Transaction not found"});
    }
      res.json(transactions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  });

// @route Delete api/transaction
// @desc Delete Transaction by ID
// @access private

router.delete("/:id",auth, async (req,res) => {
  try {
    const transactions = await Transaction.findById(req.params.id);

    if(!transactions){
      return res.status(404).json({msg:"Transaction not found"});
    }

    if(transactions.user.toString() !== req.user.id){
      return res.status(401).json({msg:"Authorization Denied"})
    }

    await transactions.remove();
    res.json({ msg: "Transaction removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Transaction not found" });
    }
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;