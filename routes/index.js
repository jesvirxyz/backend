const express = require('express');
const router = express.Router();
const User = require('../models/index');

router.get('/', async (req, res) => {
    const allUsers = await User.find();
    res.json(allUsers);
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email, password: password }, (error, result) => {
        if (!error) {
            if (!result) {
                console.log('No User found');
            } else {
                console.log('User found');
                res.json(result);
            }
        } else {
            res.json(error);
        }
    });
});

router.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirm_password;
    const newUser = await new User({
        email: email,
        password: password,
    });

    try {
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
