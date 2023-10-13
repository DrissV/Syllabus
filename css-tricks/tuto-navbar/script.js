const hamburgerToggler = document.querySelector(".hamburger");
const navlinksContainer = document.querySelector(".navlinks-container");

const toggleNav = () => {
    hamburgerToggler.classList.toggle("open");

    const ariaToggle = hamburgerToggler.getAttribute("aria-expanded") === "true" ? "false" : "true";
    hamburgerToggler.setAttribute("aria-expanded", ariaToggle);

    navlinksContainer.classList.toggle("open");
};

hamburgerToggler.addEventListener("click", toggleNav);

new ResizeObserver((entries) => {
    if (entries[0].contentRect.width <= 900) {
        navlinksContainer.style.transition = "transform .3s ease-out";
    } else {
        navlinksContainer.style.transition = "none";
    }
}).observe(document.body);

/*
const handleResize = () => {
    if (window.innerWidth <= 900) {
        navlinksContainer.style.transition = "transform .3s ease-out";
    } else {
        navlinksContainer.style.transition = "none";
    }
};

window.addEventListener("resize", handleResize);
*/