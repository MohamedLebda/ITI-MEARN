const contactForm = document.querySelector(".contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

nameInput.addEventListener("input", () => {
  displayErrorMessage(
    nameInput,
    "Please enter more that 3 characters.",
    validateName(nameInput.value)
  );
});

emailInput.addEventListener("input", () => {
  displayErrorMessage(
    emailInput,
    "Please enter a valid email address.",
    validateEmail(emailInput.value)
  );
});

messageInput.addEventListener("input", () => {
  displayErrorMessage(
    messageInput,
    "Please enter a message.",
    validateMessage(messageInput.value)
  );
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (
    validateName(nameInput.value) &&
    validateEmail(emailInput.value) &&
    validateMessage(messageInput.value)
  ) {
    showSuccessMessage();
  }
});

function showSuccessMessage() {
  const successBox = document.createElement("div");
  successBox.classList.add("success-box");
  successBox.textContent = "Message received successfully!";
  document.body.appendChild(successBox);

  setTimeout(function () {
    document.body.removeChild(successBox);
  }, 1000);
}

function displayErrorMessage(inputElement, message, isValid) {
  const errorMessage = document.querySelector(
    `#${inputElement.getAttribute("id")} + .error-message`
  );

  if (!isValid) {
    if (errorMessage.innerHTML === "") {
      errorMessage.innerHTML = message;
      inputElement.classList.add("wrong");
    }
  } else {
    errorMessage.innerHTML = "";
    inputElement.classList.remove("wrong");
  }
}

function validateName(name) {
  return /^[A-Za-z\s]{3,}$/.test(name);
}
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMessage(message) {
  return message.trim() !== "";
}

// nav

const menuBtns = document.querySelectorAll(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuBtns.forEach((menuBtn) =>
  menuBtn.addEventListener("click", () => {
    menuBtns.forEach((menuBtn) => {
      menuBtn.classList.toggle("open");
    });
    navLinks.classList.toggle("nav-show");
  })
);
