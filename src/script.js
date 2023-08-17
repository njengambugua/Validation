const userInputs = document.querySelectorAll('input');
const error = document.querySelector('.err_msg');
const docbody = document.querySelector('body');

let passInput;

window.addEventListener('load', () => {
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error-msg');
  errorDiv.style.display = 'none';
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '10%';
  errorDiv.style.left = '50%';
  errorDiv.style.transform = 'translate(-50%, -50%)';
  errorDiv.style.backgroundColor = '#ff0000';
  errorDiv.style.color = '#ffffff';
  errorDiv.style.padding = '10px';
  errorDiv.style.borderRadius = '30px';
  errorDiv.style.zIndex = '9999';
  document.body.appendChild(errorDiv);
})

function showError(message) {
  const errorP = document.createElement('p');
  errorP.textContent = message;
  const errorDiv = document.querySelector('.error-msg');
  errorDiv.innerHTML = '';
  errorDiv.appendChild(errorP);
  if (message.length) {
    errorDiv.style.display = 'block';
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 7000);
  } else{
    errorDiv.style.display = "none";
  }
  
}

userInputs.forEach(input => {
  input.addEventListener('input', () => {
    const inputValue = input.value;
    const inputId = input.id;
  
    let isValid = true;
    showError("");

    if (inputId === 'fname') {
      if (inputValue.length < 3) {
        isValid = false;
        showError("Firstname invalid since it is too short");
      } else if (!/[A-z]/.test(inputValue)) {
        isValid = false;
        showError("Firstname should at least have uppercase or lowercase letters");
      } else if (/[0-9!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~=$]/.test(inputValue)) {
        isValid = false;
        showError("First name cannot have numbers or special characters");
      }

    } else if (inputId === 'uname') {
      if(input.value.length < 5) {
        isValid = false;
        showError("Username invalid since it is too short");
      } else if(! /[A-z0-9]/.test(input.value)){
        isValid = false;
        showError("Username should at least have uppercase, lowercase letters or a number.");
      } else if(/[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~=$]/.test(input.value)){
        isValid = false;
        showError("Username cannot have special characters");
      }

    } else if (inputId === 'email') {
      const emailArray = input.value.split('@');
        const localPart = emailArray[0];
        const domain = emailArray[1];
        const asciiRegex = /^[a-zA-Z0-9!#\$%&'\*\+\-\/=\?\^_`{|}~]+$/;
        // console.log(domainArr);
        if (emailArray.length !== 2) {
          showError("Invalid email format: Only one @ is allowed");
          isValid = false;
        } else if (localPart.length > 64) {
          showError("Invalid email: Local part is too long");
          isValid = false;
        } else if (!asciiRegex.test(localPart)) {
          showError("Invalid email format: Local part contains invalid characters");
          isValid = false;
        } else if (input.value.startsWith('.') || input.value.endsWith('.')) {
          showError("Invalid email format: Check the dot index");
          isValid = false;
        } else if (domain.length === 0 || domain.includes('_') || domain.startsWith('-') || domain.endsWith('-')) {
          showError("Invalid email domain");
          isValid = false;
        } 

    } else if (inputId === 'psw') {
      if (input.value.length < 8) {
        showError("Password must have at least 8 characters");
        isValid = false;
      } else if (! /[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~=$]/.test(input.value)) {
        showError("Password must have at least one special character");
        isValid = false;
      } else if (! /[0-9]/.test(input.value)) {
        showError("Password must have at least one digit");
        isValid = false;
      } else if (! /[A-Z]/.test(input.value)) {
        showError("Password must have at least one uppercase letter");
        isValid = false;
      } else{
        passInput = input.value;
      }

    } else if (inputId == 'cpsw') {
      if (!(input.value === passInput)) {
        showError("Password do not match");
        isValid = false;
      }
    }

    // Update border color based on the validation result
    input.style.border = isValid ? "3px solid green" : "3px solid red";
  });
});