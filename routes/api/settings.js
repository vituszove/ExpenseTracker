const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require('../../middleware/auth');
const Transaction = require("../../models/Transaction");
const User = require("../../models/User");
const moment = require("moment");

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
      const transactions = await Transaction.find({'user':req.user.id});
      const user = await User.findById(req.user.id).select('-password');

      let userExpense = transactions.map(trans => 
         trans.amount
      )
      var totalAmount = userExpense.reduce(function(total, currentVal){
         return total + currentVal;
     }, 0);
      
  
     let userObj = await user.toObject();
     if(!userObj.hasOwnProperty('income')){
        res.status(401).json({msg:'Please go settings page set your income'})
     } else{
      user.balance = user.income - totalAmount;
      res.json(user);
      await user.save();
     }
     
   }catch(err){
      console.error(err.message);
    res.status(500).send('Internal Server Error')
   }
})

router.get('/history',auth, async (req,res) => {

   try {
      let week = 7;
      let month = 31;
      let year = 365;
      let currentDate = new Date();
      let day = currentDate.getDate();
     let dateTimeFilter = day - week;
      
      let filter = {"date":'777',"user":req.user.id};
      const transactions = await Transaction.find(filter);
      
      res.json(transactions)

      
     
 
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error')
   }
})
module.exports = router;
