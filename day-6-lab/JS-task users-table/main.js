var getBtn = document.querySelector(".get-btn");

getBtn.addEventListener("click", getUserData);

function getUserData() {
  var xhr = new XMLHttpRequest();
  if (!document.querySelectorAll("td").length) {
    xhr.onreadystatechange = function () {
      var tbody = document.querySelector("tbody");
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var userData = JSON.parse(xhr.response);
          var propertiesToShow = ["id", "name", "email", "phone", "website"];

          for (var i = 0; i < userData.length; i++) {
            var tr = document.createElement("tr");

            for (var j = 0; j < propertiesToShow.length; j++) {
              var td = document.createElement("td");
              td.innerHTML = userData[i][propertiesToShow[j]];
              tr.appendChild(td);
            }

            tbody.appendChild(tr);
          }
        }
      }
    };
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
    xhr.send("");
  }
}
