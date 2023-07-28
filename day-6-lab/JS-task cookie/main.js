document
  .querySelector(".submit-btn")
  .addEventListener("click", function (event) {
    validateForm();
  });

function validateForm() {
  var nameInput = document.getElementById("st-name");
  var ageInput = document.getElementById("age");
  var genderInput = document.querySelector("input[type='radio']:checked");
  var colorSelect = document.querySelector("select[name='color']");
  var nameError = document.querySelector(".name-err");
  var ageError = document.querySelector(".age-err");
  var genderError = document.querySelector(".gender-err");
  var colorError = document.querySelector(".color-err");

  nameError.textContent = "";
  nameInput.classList.remove("wrong");
  ageError.textContent = "";
  ageInput.classList.remove("wrong");
  genderError.textContent = "";
  colorError.textContent = "";

  var isValid = true;

  if (nameInput.value.trim() === "") {
    nameError.textContent = "Name is required.";
    nameInput.classList.add("wrong");
    isValid = false;
  }

  if (ageInput.value.trim() === "") {
    ageError.textContent = "age is required.";
    ageInput.classList.add("wrong");
    isValid = false;
  }

  if (!genderInput) {
    genderError.textContent = "Gender is required.";
    isValid = false;
  }

  if (colorSelect.value === "select a color") {
    colorError.textContent = "Please select a color.";
    isValid = false;
  }

  if (isValid) {
    cookieLibrary.setCookie("name", nameInput.value);
    cookieLibrary.setCookie("age", ageInput.value);
    cookieLibrary.setCookie(
      "gender",
      document.querySelector("input[type='radio']:checked").value
    );
    cookieLibrary.setCookie("color", colorSelect.value);

    location.href = "./welcome.html";
  }
}

if (cookieLibrary.getCookie("name")) {
  location.href = "./welcome.html";
}
