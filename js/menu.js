const header = document.getElementById("cabecalho");

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

const menuToggle = document.getElementById("menu-toggle");
const navPrincipal = document.getElementById("nav-principal");

if (menuToggle && navPrincipal) {
    menuToggle.addEventListener("click", function () {
        navPrincipal.classList.toggle("aberto");

        if (navPrincipal.classList.contains("aberto")) {
            menuToggle.textContent = "×";
            menuToggle.setAttribute("aria-label", "Fechar menu");
        } else {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-label", "Abrir menu");
        }
    });
}