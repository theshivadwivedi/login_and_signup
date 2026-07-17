const API="https://login-and-signup-r77e.onrender.com";

function showLogin(){

    loginForm.style.display="block";
    signupForm.style.display="none";

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    message.innerText="";
}

function showSignup(){

    signupForm.style.display="block";
    loginForm.style.display="none";

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    message.innerText="";
}

async function signup(){

    const username=username.value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    const response=await fetch(`${API}/signup`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            username,
            email,
            password
        })

    });

    const data=await response.json();

    message.style.color="#00ff9d";
    message.innerText=data.message || "Signup Successful";

}

async function login(){

    const email=document.getElementById("login_email").value;

    const password=document.getElementById("login_password").value;

    const response=await fetch(`${API}/login`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            email,
            password
        })

    });

    const data=await response.json();

    if(response.ok){

        message.style.color="#00ff9d";

        message.innerText=data.message;

    }

    else{

        message.style.color="#ff6b6b";

        message.innerText="Wrong Email or Password";

    }

}
