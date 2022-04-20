const menu = document.querySelector("#menu");
const navLinks = document.querySelector("#nav_links");
const customCursor = document.querySelector("#cursor");

menu.addEventListener("click", (e) => {
  navLinks.toggleAttribute("active");
});

const whatSection = document.querySelector("#what");
console.log(whatSection.clientTop);

