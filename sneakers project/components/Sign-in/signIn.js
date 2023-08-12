import { cookieLibrary } from "./cookie.js";

document.querySelector(".submit-btn").addEventListener("click", function (e) {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  const nameInput = document.getElementById("st-name");
  const ageInput = document.getElementById("age");
  const genderInputs = document.querySelectorAll("input[name='gender']");
  const nameError = document.querySelector(".name-err");
  const ageError = document.querySelector(".age-err");
  const genderError = document.querySelector(".gender-err");

  nameError.textContent = "";
  nameInput.classList.remove("wrong");
  ageError.textContent = "";
  ageInput.classList.remove("wrong");
  genderError.textContent = "";

  let isValid = true;

  // Name validation
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Name is required.";
    nameInput.classList.add("wrong");
    isValid = false;
  } else if (!/^[A-Za-z\s]{3,}$/.test(nameInput.value)) {
    nameError.textContent = "Name should be at least 3 letters.";
    nameInput.classList.add("wrong");
    isValid = false;
  }

  // Age validation
  if (ageInput.value.trim() === "") {
    ageError.textContent = "Age is required.";
    ageInput.classList.add("wrong");
    isValid = false;
  } else if (isNaN(ageInput.value) || parseInt(ageInput.value) <= 0) {
    ageError.textContent = "Invalid age. Please enter a valid number.";
    ageInput.classList.add("wrong");
    isValid = false;
  }

  const selectedGender = Array.from(genderInputs).find(
    (input) => input.checked
  );

  // Gender validation
  if (!selectedGender) {
    genderError.textContent = "Gender is required.";
    isValid = false;
  }

  if (isValid) {
    const name = nameInput.value;
    const age = ageInput.value;
    const gender = selectedGender.value;

    cookieLibrary.setCookie("name", name);
    cookieLibrary.setCookie("age", age);
    cookieLibrary.setCookie("gender", gender);

    location.href = "../../index.html";
  }
}

if (cookieLibrary.getCookie("name")) {
  location.href = "../../index.html";
}
