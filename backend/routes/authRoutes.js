const express = require("express");
const router = express.Router();

const User = require("../models/User");


router.post("/register", async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;

        const newUser = new User({
            name,
            email,
            phone,
            password
        });

        await newUser.save();

        res.json({
            message: "User Registered Successfully"
        });

    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;