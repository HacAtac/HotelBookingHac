const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post('/register', async(req, res) => {
    const newuser = new User(req.body)
    try {
        const user = await newuser.save()
        res.send(user)
    } catch (err) {
        res.status(400).json(err)
    }
});

router.post('/login', async(req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email: email, password: password})
        if(user) {
            res.send(user)
        } else {
            return res.status(400).json({message: "Invalid email or password"});
        }
    } catch (error) {
        return res.status(400).json({error});
    }
});

module.exports = router;