var logout = document.querySelector("button");

window.onload = function () {
  var userName = cookieLibrary.getCookie("name");
  var gender = cookieLibrary.getCookie("gender");
  var visits = cookieLibrary.getCookie("visits") || 0;
  var fontColor = cookieLibrary.getCookie("color");

  var greetingElement = document.getElementById("greeting");
  greetingElement.innerHTML = `Welcome, <span>${userName}</span> You have visited this site <span>${visits}</span> times.`;
  var changeColors = greetingElement.querySelectorAll("span");
  for (var i = 0; i < changeColors.length; i++) {
    changeColors[i].style.color = fontColor;
  }

  var profilePicElement = document.getElementById("profilePic");
  profilePicElement.src =
    gender === "male" ? "./images/1.jpg" : "./images/2.jpg";

  var newVisits = parseInt(visits) + 1;
  cookieLibrary.setCookie("visits", newVisits, "2030-12-31");
};

logout.addEventListener("click", toLogin);

function toLogin() {
  cookieLibrary.deleteCookie("name");
  cookieLibrary.deleteCookie("gender");
  cookieLibrary.deleteCookie("visits");
  cookieLibrary.deleteCookie("color");
  cookieLibrary.deleteCookie("age");
  location.href = "./index.html";
}
