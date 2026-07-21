// =========================================
// USER STATES
// =========================================

let isSignupUser1 = false;
let isSignupUser2 = false;


// =========================================
// TOGGLE AUTH USER 1
// =========================================

document.getElementById("toggleAuthUser1").addEventListener("click", () => {

    isSignupUser1 = !isSignupUser1;

    document.getElementById("authTitleUser1").textContent =
        isSignupUser1 ? "Sign Up" : "Login";

    document.getElementById("usernameUser1").classList.toggle("hidden", !isSignupUser1);

    document.getElementById("authBtnUser1").textContent =
        isSignupUser1 ? "Sign Up" : "Login";

    document.getElementById("authTextUser1").textContent =
        isSignupUser1
            ? "Already have an account?"
            : "Don't have an account?";

    document.getElementById("toggleAuthUser1").textContent =
        isSignupUser1
            ? "Login"
            : "Sign Up";

});



// =========================================
// TOGGLE AUTH USER 2
// =========================================

document.getElementById("toggleAuthUser2").addEventListener("click", () => {

    isSignupUser2 = !isSignupUser2;

    document.getElementById("authTitleUser2").textContent =
        isSignupUser2 ? "Sign Up" : "Login";

    document.getElementById("usernameUser2").classList.toggle("hidden", !isSignupUser2);

    document.getElementById("authBtnUser2").textContent =
        isSignupUser2 ? "Sign Up" : "Login";

    document.getElementById("authTextUser2").textContent =
        isSignupUser2
            ? "Already have an account?"
            : "Don't have an account?";

    document.getElementById("toggleAuthUser2").textContent =
        isSignupUser2
            ? "Login"
            : "Sign Up";

});



// =========================================
// AUTH BUTTON USER 1
// =========================================

document.getElementById("authBtnUser1").addEventListener("click", () => {

    if (isSignupUser1)
        signupUser1();
    else
        loginUser1();

});



// =========================================
// AUTH BUTTON USER 2
// =========================================

document.getElementById("authBtnUser2").addEventListener("click", () => {

    if (isSignupUser2)
        signupUser2();
    else
        loginUser2();

});



// =========================================
// SIGNUP USER 1
// =========================================

async function signupUser1() {

    const username = document.getElementById("usernameUser1").value.trim();
    const email = document.getElementById("emailUser1").value.trim();
    const password = document.getElementById("passwordUser1").value.trim();

    const response = await fetch(`${API_URL}/auth/register`, {

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

    alert(data.message);

}



// =========================================
// SIGNUP USER 2
// =========================================

async function signupUser2() {

    const username = document.getElementById("usernameUser2").value.trim();
    const email = document.getElementById("emailUser2").value.trim();
    const password = document.getElementById("passwordUser2").value.trim();

    const response = await fetch(`${API_URL}/auth/register`, {

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

    alert(data.message);

}



// =========================================
// LOGIN USER 1
// =========================================

async function loginUser1() {

    const email = document.getElementById("emailUser1").value.trim();
    const password = document.getElementById("passwordUser1").value.trim();

    const response = await fetch(`${API_URL}/auth/login`, {

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
    console.log("LOGIN RESPONSE:", data);

    if (!response.ok) {

        alert(data.message);

        return;

    }

    localStorage.setItem("tokenUser1", data.accessToken);

    localStorage.setItem("user1", JSON.stringify(data.user));

    document.getElementById("authScreenUser1").classList.add("hidden");

    document.getElementById("chatScreenUser1").classList.remove("hidden");

}



// =========================================
// LOGIN USER 2
// =========================================

async function loginUser2() {

    const email = document.getElementById("emailUser2").value.trim();
    const password = document.getElementById("passwordUser2").value.trim();

    const response = await fetch(`${API_URL}/auth/login`, {

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
      console.log("LOGIN RESPONSE:", data);

    if (!response.ok) {

        alert(data.message);

        return;

    }

    localStorage.setItem("tokenUser2", data.accessToken);

    localStorage.setItem("user2", JSON.stringify(data.user));

    document.getElementById("authScreenUser2").classList.add("hidden");

    document.getElementById("chatScreenUser2").classList.remove("hidden");

}



// =========================================
// LOGOUT USER 1
// =========================================

document.getElementById("logoutBtnUser1").addEventListener("click", () => {

    localStorage.removeItem("tokenUser1");
    localStorage.removeItem("user1");

    location.reload();

});



// =========================================
// LOGOUT USER 2
// =========================================

document.getElementById("logoutBtnUser2").addEventListener("click", () => {

    localStorage.removeItem("tokenUser2");
    localStorage.removeItem("user2");

    location.reload();

});