// Seleciona o header pelo id
const header = document.getElementById('cabecalho');

// Escuta o evento de scroll da página
window.addEventListener('scroll', function () {

    // Se rolou mais de 50px, adiciona a classe 'scrolled'
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

});