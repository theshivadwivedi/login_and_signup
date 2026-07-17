const API = "https://login-and-signup-r77e.onrender.com";

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const message = document.getElementById("message");

// Show Login Form
function showLogin() {
    loginForm.style.display = "block";
    signupForm.style.display = "none";

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    message.innerText = "";
}

// Show Signup Form
function showSignup() {
    signupForm.style.display = "block";
    loginForm.style.display = "none";

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    message.innerText = "";
}

// Signup
async function signup() {

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !email || !password) {
        message.style.color = "#ff6b6b";
        message.innerText = "Please fill all fields.";
        return;
    }

    try {

        const response = await fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            message.style.color = "#00ff9d";
            message.innerText = "Account created successfully!";

            document.getElementById("username").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";

            setTimeout(showLogin, 1500);

        } else {
            message.style.color = "#ff6b6b";
            message.innerText = data.detail || "Signup failed.";
        }

    } catch (error) {
        message.style.color = "#ff6b6b";
        message.innerText = "Cannot connect to server.";
        console.error(error);
    }
}

// Login
async function login() {

    const email = document.getElementById("login_email").value.trim();
    const password = document.getElementById("login_password").value;

    if (!email || !password) {
        message.style.color = "#ff6b6b";
        message.innerText = "Please fill all fields.";
        return;
    }

    try {

        const response = await fetch(`${API}/login`, {
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

        if (response.ok) {
            message.style.color = "#00ff9d";
            message.innerText = `Welcome ${data.username}!`;

        } else {
            message.style.color = "#ff6b6b";
            message.innerText = data.detail || "Wrong email or password.";
        }

    } catch (error) {
        message.style.color = "#ff6b6b";
        message.innerText = "Cannot connect to server.";
        console.error(error);
    }
}
