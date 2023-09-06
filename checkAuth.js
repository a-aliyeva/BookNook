const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

const logoutButton = document.getElementById("logout-button");
const signinButton = document.getElementById("signin-button");
const signupButton = document.getElementById("signup-button");

if (loggedInUser) {
    signinButton.style.display = "none";
    signupButton.style.display = "none";
    logoutButton.style.display = "inline";
} else {
    signinButton.style.display = "inline"; 
    signupButton.style.display = "inline"; 
    logoutButton.style.display = "none";
}
