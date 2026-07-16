function showLogin(){

    document.getElementById("loginForm").style.display="block";

    document.getElementById("signupForm").style.display="none";

    document.getElementById("message").innerText="";
}


function showSignup(){

    document.getElementById("signupForm").style.display="block";

    document.getElementById("loginForm").style.display="none";

    document.getElementById("message").innerText="";
}


async function signup(){

    const username=document.getElementById("username").value;

    const email=document.getElementById("email").value;

    const password=document.getElementById("password").value;

    const response=await fetch("http://127.0.0.1:8000/signup",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            username:username,
            email:email,
            password:password

        })

    });

    const data=await response.json();

    document.getElementById("message").innerText=data.message || "Signup Successful";

}



async function login() {

    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;

    const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const message = document.getElementById("message");

    if (response.ok) {
        const data = await response.json();
        message.style.color = "green";
        message.innerText = data.message;
    } else {
        message.style.color = "red";
        message.innerText = "Wrong email or password";
    }
}