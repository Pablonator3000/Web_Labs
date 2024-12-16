document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("fixed-nav");
    const navOffset = nav.offsetTop;

    window.addEventListener("scroll", () => {
        if (window.scrollY > navOffset) {
            nav.classList.add("pin-nav");
        } else {
            nav.classList.remove("pin-nav");
        }
    });
});