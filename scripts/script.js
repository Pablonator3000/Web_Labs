(function () {
    // Подписываемся на загрузку страницы
    window.addEventListener("load", () => {
        const loadTime = performance.now(); // Время загрузки страницы
        const loadStats = document.getElementById("load-stats");
        if (loadStats) {
            loadStats.textContent = `Время загрузки страницы: ${loadTime.toFixed(2)} мс`;
        }
    });

    const menuLinks = document.querySelectorAll(".menu a");
    menuLinks.forEach(link => {
        const currentPage = document.location.pathname.split('/').pop();
        const linkPage = new URL(link.href).pathname.split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });



    const menuItems = document.querySelectorAll(".menu li");
    menuItems.forEach(item => {
        item.addEventListener("mouseover", () => {
            item.classList.add("hovered");
        });
        item.addEventListener("mouseout", () => {
            item.classList.remove("hovered");
        });
    });
})();