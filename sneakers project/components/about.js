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
