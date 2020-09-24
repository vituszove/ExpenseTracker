const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

router.post('/',
[check('name','Name is required').not().isEmpty(),
check('email','Email is required').isEmail(),
check('password','Please Enter Password with at least 6 character').isLength({min:6})], 
async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const { name, email, password} = req.body;
    try {
        let user = await User.findOne({email});

    
        //Check user exists
        if(user){
            res.status(400).json({errors: [{msg:'User already exists'}]})
        }

        user = new User({
            name,
            email,
            password
        })
        //Encrypt Password
        const encryptpass = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, encryptpass);
        await user.save();
        //Return JWT
        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(
            payload,
            config.get("jwtToken"),
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
       
  
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error')
    }
})


module.exports = router;
























