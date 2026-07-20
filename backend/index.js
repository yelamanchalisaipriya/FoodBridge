require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();


// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());


// ================= MONGODB CONNECTION =================

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((error) => {
    console.log("MongoDB Error:", error);
});


// ================= USER SCHEMA =================

const userSchema = new mongoose.Schema({

    name: String,
    email: String,
    phone: String,
    password: String,
    confirmPassword: String,
    role: String,
    address: String

});


const User = mongoose.model("User", userSchema);



// ================= DONATION SCHEMA =================

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


const Donation = mongoose.model("Donation", donationSchema);



// ================= REQUEST SCHEMA =================

const requestSchema = new mongoose.Schema({

    name: String,
    phone: String,
    meals: String,
    address: String,
    reason: String

});


const Request = mongoose.model("Request", requestSchema);



// ================= HOME =================

app.get("/", (req,res)=>{

    res.send("Welcome to FoodBridge");

});



// ================= REGISTER =================

app.post("/register", async(req,res)=>{

    try{

        console.log("Register Data:", req.body);


        const user = new User({

            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password,
            confirmPassword:req.body.confirmPassword,
            role:req.body.role,
            address:req.body.address

        });


        await user.save();


        res.json({

            message:"Registration Successful"

        });


    }
    catch(error){

        console.log(error);

        res.status(500).json({

            message:"Registration Failed"

        });

    }

});



// ================= LOGIN =================

app.post("/login", async(req,res)=>{

    try{

        const {email,password}=req.body;


        const user = await User.findOne({

            email:email

        });


        if(!user){

            return res.json({

                message:"User Not Found"

            });

        }


        if(user.password !== password){

            return res.json({

                message:"Incorrect Password"

            });

        }


        res.json({

            message:"Login Successful",
            user:user

        });


    }
    catch(error){

        console.log(error);

        res.status(500).json({

            message:"Login Failed"

        });

    }

});



// ================= DONATE FOOD =================

app.post("/donate-food", async(req,res)=>{


    try{


        const donation = new Donation(req.body);


        await donation.save();


        res.json({

            message:"Food Donation Successful"

        });


    }
    catch(error){

        console.log(error);

        res.status(500).json({

            message:"Donation Failed"

        });

    }


});



// ================= FIND FOOD =================

app.get("/find-food", async(req,res)=>{


    try{


        const food = await Donation.find();


        res.json(food);


    }
    catch(error){

        res.status(500).json(error);

    }


});



// ================= REQUEST FOOD =================

app.post("/request-food", async(req,res)=>{


    try{


        const request = new Request(req.body);


        await request.save();


        res.json({

            message:"Food Request Submitted Successfully"

        });


    }
    catch(error){

        console.log(error);

        res.status(500).json({

            message:"Request Failed"

        });

    }


});



// ================= ADMIN APIs =================


app.get("/users", async(req,res)=>{

    const users = await User.find();

    res.json(users);

});



app.get("/donations", async(req,res)=>{

    const donations = await Donation.find();

    res.json(donations);

});



app.get("/requests", async(req,res)=>{

    const requests = await Request.find();

    res.json(requests);

});



// ================= SERVER =================

app.listen(3000,()=>{

    console.log("FoodBridge Server is Running Successfully");

});