const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require('../../middleware/auth');
const Transaction = require("../../models/Transaction");
const User = require("../../models/User");

router.put('/income',auth,[check('income','Please Enter your income').not().isEmpty().isNumeric()], async (req,res) => {
const {income} = req.body;
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
 try{
   const user = await User.findById(req.user.id).select('-password');
   user.income = income;
   await user.save();
   res.json(user)
 }catch(err){
    console.error(err.message);
    res.status(500).send('Internal Server Error')
 }  
});


router.get('/balance',auth, async (req,res) => {
   try{
      const transactions = await Transaction.find({'user':req.user.id})
      let userExpense = transactions.map(trans => 
         trans.amount
      )
      var totalAmount = userExpense.reduce(function(total, currentVal){
         return total + currentVal;
     }, 0);
      
     const user = await User.findById(req.user.id).select('-password');
     user.balance = user.income - totalAmount;
     res.json(user);
     await user.save();
   }catch(err){
      console.error(err.message);
    res.status(500).send('Internal Server Error')
   }
})
module.exports = router;
