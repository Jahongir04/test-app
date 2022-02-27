const express=require('express');
const router=express.Router();
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const _=require('lodash');
router.post('/login', async (req, res) => {
    console.log("Hi every one")
    if (req.body=='')
        return res.status(400).send("malumot yetarli emas");

    let user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send({success: false,message: "bunday foydalanuvchi topilmadi"});

    const isCorrectPassword =await bcrypt.compare(req.body.password, user.password);
    console.log(isCorrectPassword);
    if (!isCorrectPassword)
        return res.status(400).send({success:false,message: "parolda xatolik"});

    const token = jwt.sign({ _id: user._id,role: user.role }, 'Bearer ')
    console.log(token);
    res.json(token);

})
router.post('/register', async (req, res) => {
    if (req.body=='')
        return res.status(400).send("request body is empty")

    let user = await User.findOne({ email: req.body.email });
    if (user)
        return res.status(201).send({success: false,message: 'bunday foydalanuvchi tarmoqda mavjud'})
    user = new User(_.pick(req.body, ['name', 'email', 'password', 'role']))
    const salt=await bcrypt.genSalt();
    user.password=await bcrypt.hash(user.password,salt)
    await user.save();
    console.log(user);
    return res.send({success:true});
})
module.exports=router;