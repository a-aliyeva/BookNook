let users = JSON.parse(localStorage.getItem("users")) || [];
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

function loginUser(username, password) {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
        loggedInUser = user;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }
    return user;
}

function signUpUser(username, password) {
    const isUsernameTaken = users.some((u) => u.username === username);

    if (isUsernameTaken) {
        return null;
    } else {
        const newUser = { username, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        loggedInUser = newUser;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        return newUser; 
    }
}

function logoutUser() {
    loggedInUser = null;
    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";
}

function updateHeader() {
    const signinButton = document.getElementById("signin-button");
    const signupButton = document.getElementById("signup-button");
    const logoutButton = document.getElementById("logout-button");

    if (loggedInUser) {
        signinButton.style.display = "none";
        signupButton.style.display = "none";
        logoutButton.style.display = "block";
    } else {
        signinButton.style.display = "block";
        signupButton.style.display = "block";
        logoutButton.style.display = "none";
    }
}

window.addEventListener('load', updateHeader);

updateHeader();

document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    const newUser = signUpUser(username, password);

    if (newUser) {
        document.getElementById("signup-form").style.display = "none";
        document.getElementById("signup-success").style.display = "block";
        document.getElementById("login-username").value = newUser.username;
        document.getElementById("login-password").value = newUser.password;
        updateHeader();
    } else {
        alert("Sign-up failed. Username is already taken.");
    }
});

document.getElementById("logout-button").addEventListener("click", function (e) {
    e.preventDefault();
    logoutUser();
    updateHeader();
});
