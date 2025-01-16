function generateCaptcha() {
    let captchaText = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const captchaLength = 6; 
    for (let i = 0; i < captchaLength; i++) {
        captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById('captchaText').innerText = captchaText;  
}

window.onload = function () {
    generateCaptcha();
};

function validateForm() {
    let formError = document.getElementById("formError");
    let captchaError = document.getElementById("captchaError");
    let captcha = document.getElementById("captcha").value;
    let captchaText = document.getElementById("captchaText").innerText;

    formError.innerHTML = '';
    captchaError.innerHTML = '';

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let userId = document.getElementById("userId").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let email = document.getElementById("email").value;
    let salutation = document.getElementById("salutation").value;

    if (!firstName || !lastName) {
        formError.innerHTML = "First name and Last name are required.";
        return false;
    }

    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !email.match(emailPattern)) {
        formError.innerHTML = "Please enter a valid email address.";
        return false;
    }

    let userIdPattern = /^[a-zA-Z0-9]+$/;  
    if (userId.length < 5) {
        formError.innerHTML = "User ID must be at least 5 characters.";
        return false;
    }
    if (!userId.match(userIdPattern)) {
        formError.innerHTML = "User ID can only contain alphabets and numbers.";
        return false;
    }

    let passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!password.match(passwordPattern)) {
        formError.innerHTML = "Password must be at least 8 characters long, and contain at least one uppercase letter and one special character.";
        return false;
    }

    if (password !== confirmPassword) {
        formError.innerHTML = "Passwords do not match.";
        return false;
    }

    if (captcha !== captchaText) {
        captchaError.innerHTML = "Captcha does not match.";
        return false;
    }

    return true;
}
