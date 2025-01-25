document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const isPasswordHidden = passwordField.type === "password";
  
    passwordField.type = isPasswordHidden ? "text" : "password";
  
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });
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
    addRealTimeValidation();
};
  
function addRealTimeValidation() {
  const fields = ['captcha'];
  fields.forEach(field => {
      document.getElementById(field).addEventListener('input', validateField);
  });
}


function validateField() {
    let captchaError = document.getElementById("captchaError");

   captchaError.innerHTML = '';

  let captcha = document.getElementById("captcha").value;
  let captchaText = document.getElementById("captchaText").innerText;

    if (captcha && captcha !== captchaText) {
      captchaError.innerHTML = "Captcha does not match.";
  }
}

function validateForm() {
       let captchaError = document.getElementById("captchaError").innerHTML;

       
    if(captchaError)
      {
          return false;
      }
          return true;

}
