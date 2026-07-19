const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();


//================= MONGODB CONNECTION =================

mongoose.connect("mongodb://127.0.0.1:27017/FoodBridge")

.then(() => {

    console.log("MongoDB Connected Successfully");

})

.catch((error) => {

    console.log(error);

});



//================= MIDDLEWARES =================

app.use(cors());

app.use(bodyParser.json());




//================= USER SCHEMA =================

const userSchema = new mongoose.Schema({

    name: String,
    email: String,
    phone: String,
    password: String,
    confirmPassword: String,
    role: String,
    address: String

});


//================= USER MODEL =================

const User = mongoose.model(

    "User",

    userSchema

);




//================= DONATION SCHEMA =================

const donationSchema = new mongoose.Schema({

    foodName: String,
    quantity: String,
    foodType: String,
    preparedTime: String,
    expiryTime: String,
    address: String,
    phone: String,
    instructions: String

});


//================= DONATION MODEL =================

const Donation = mongoose.model(

    "Donation",

    donationSchema

);




//================= REQUEST SCHEMA =================

const requestSchema = new mongoose.Schema({

    name: String,
    phone: String,
    meals: String,
    address: String,
    reason: String

});


//================= REQUEST MODEL =================

const Request = mongoose.model(

    "Request",

    requestSchema

);




//================= HOME PAGE =================

app.get("/", (req, res) => {

    res.send("Welcome to FoodBridge");

});




//================= REGISTER API =================

app.post("/register", async (req, res) => {


    const {

        name,
        email,
        phone,
        password,
        confirmPassword,
        role,
        address

    } = req.body;



    const user = new User({

        name,
        email,
        phone,
        password,
        confirmPassword,
        role,
        address

    });



    await user.save();



    res.send(

        "Registration Successful"

    );


});




//================= LOGIN API =================

app.post("/login", async (req, res) => {


    const {

        email,
        password,
        role

    } = req.body;



    console.log("Email :", email);



    const user = await User.findOne({

        email: email

    });



    console.log(user);



    if (!user) {

        return res.send(

            "User Not Found"

        );

    }



    if (user.password !== password) {

        return res.send(

            "Incorrect Password"

        );

    }



    res.send(

        "Login Successful"

    );


});




//================= DONATE FOOD API =================

app.post("/donate-food", async (req, res) => {


    const {

        foodName,
        quantity,
        foodType,
        preparedTime,
        expiryTime,
        address,
        phone,
        instructions

    } = req.body;



    const newDonation = new Donation({

        foodName,
        quantity,
        foodType,
        preparedTime,
        expiryTime,
        address,
        phone,
        instructions

    });



    await newDonation.save();



    res.send(

        "Food Donation Successful"

    );


});




//================= FIND FOOD API =================

app.get("/find-food", async (req, res) => {


    const donations =

        await Donation.find();



    res.json(donations);


});




//================= REQUEST FOOD API =================

app.post("/request-food", async (req, res) => {


    const {

        name,
        phone,
        meals,
        address,
        reason

    } = req.body;



    const newRequest = new Request({

        name,
        phone,
        meals,
        address,
        reason

    });



    await newRequest.save();



    res.send(

        "Food Request Submitted Successfully"

    );


});




//================= ADMIN APIs =================


//---------- GET USERS ----------

app.get("/users", async (req, res) => {


    const users =

        await User.find();



    res.json(users);


});




//---------- GET DONATIONS ----------

app.get("/donations", async (req, res) => {


    const donations =

        await Donation.find();



    res.json(donations);


});




//---------- GET REQUESTS ----------

app.get("/requests", async (req, res) => {


    const requests =

        await Request.find();



    res.json(requests);


});




//================= SERVER =================

app.listen(3000, () => {


    console.log(

        "FoodBridge Server is Running Successfully"

    );


});