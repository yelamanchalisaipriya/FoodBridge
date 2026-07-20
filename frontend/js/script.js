// ================= WELCOME MESSAGE =================

console.log("Welcome to FoodBridge!");


// Backend URL
const API_URL = "http://localhost:5000";


// ================= LOGIN =================

async function loginSuccess() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    try {

        const response = await fetch(`${API_URL}/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });


        const data = await response.json();

        alert(data.message);


        if(data.message === "Login Successful"){

            window.location.href = "index.html";

        }


    }

    catch(error){

        console.log(error);
        alert("Server Error");

    }

}



// ================= REGISTER =================

async function checkPassword(password, confirmPassword) {


    if(password !== confirmPassword){

        alert("Passwords do not match!");
        return false;

    }


    const userData = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        password: password,

        confirmPassword: confirmPassword,

        role: document.getElementById("role").value,

        address: document.getElementById("address").value

    };


    try {


        const response = await fetch(`${API_URL}/register`, {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify(userData)

        });


        const data = await response.json();


        alert(data.message);



        if(data.message === "Registration Successful"){

            window.location.href="login.html";

        }


    }


    catch(error){

        console.log(error);
        alert("Server Error");

    }


    return true;

}



// ================= DONATE FOOD =================

async function donateFood(){


    const donationData = {


        foodName: document.getElementById("foodName").value,

        quantity: document.getElementById("quantity").value,

        foodType: document.getElementById("foodType").value,

        preparedTime: document.getElementById("preparedTime").value,

        expiryTime: document.getElementById("expiryTime").value,

        address: document.getElementById("address").value,

        phone: document.getElementById("phone").value,

        instructions: document.getElementById("instructions").value


    };



    try{


        const response = await fetch(`${API_URL}/donate-food`,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(donationData)

        });



        const data = await response.json();


        alert(data.message);


    }


    catch(error){

        console.log(error);
        alert("Server Error");

    }


}



// ================= FIND FOOD =================


async function findFood(){


    try{


        const response = await fetch(`${API_URL}/find-food`);


        const data = await response.json();


        console.log(data);


        alert("Food list loaded. Check console.");


    }


    catch(error){

        console.log(error);
        alert("Unable to fetch food");

    }


}



// ================= FOOD REQUEST =================

function requestFood(){

    alert("Food Request Submitted Successfully.");

}



// ================= VOLUNTEER =================

function acceptRequest(){

    alert("You have accepted the delivery request.");

}



// ================= DELIVERY STATUS =================

function deliveryCompleted(){

    alert("Food Delivered Successfully!");

}



// ================= CONTACT FORM =================

function sendMessage(){

    alert("Your message has been sent successfully.");

}



// ================= PROFILE =================

function updateProfile(){

    alert("Profile Updated Successfully.");

}



function logout(){

    alert("Logged Out Successfully.");

    window.location.href="login.html";

}



// ================= ADMIN =================

function addUser(){

    alert("User Added Successfully.");

}


function removeUser(){

    alert("User Removed Successfully.");

}


function viewUsers(){

    alert("Displaying User Details.");

}



// ================= BUTTON HOVER EFFECT =================

const buttons = document.querySelectorAll("button");


buttons.forEach(function(button){


    button.addEventListener("mouseover",function(){

        button.style.opacity="0.9";

    });



    button.addEventListener("mouseleave",function(){

        button.style.opacity="1";

    });


});