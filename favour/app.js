const menu = document.querySelector("#menu");
const navLinks = document.querySelector("#nav_links");

menu.addEventListener("click", (e) => {
    navLinks.toggleAttribute("active")
});


