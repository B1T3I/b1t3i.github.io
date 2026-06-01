(() => {
    const cabecalho = document.getElementById('cabecalho');

    if (!cabecalho) return;

    const atualizarHeader = () => {
        cabecalho.classList.toggle('scrolled', window.scrollY > 50);
    };

    atualizarHeader();
    window.addEventListener('scroll', atualizarHeader);
})();
