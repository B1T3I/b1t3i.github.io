(() => {
    const cabecalho = document.getElementById('cabecalho');
    const menuToggle = document.getElementById('menu-toggle');
    const navPrincipal = document.getElementById('nav-principal');

    if (cabecalho) {
        const atualizarHeader = () => {
            cabecalho.classList.toggle('scrolled', window.scrollY > 50);
        };

        atualizarHeader();
        window.addEventListener('scroll', atualizarHeader);
    }

    if (!menuToggle || !navPrincipal) return;

    const fecharMenu = () => {
        navPrincipal.classList.remove('aberto');
        menuToggle.textContent = '☰';
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    const abrirMenu = () => {
        navPrincipal.classList.add('aberto');
        menuToggle.textContent = '×';
        menuToggle.setAttribute('aria-label', 'Fechar menu');
        menuToggle.setAttribute('aria-expanded', 'true');
    };

    menuToggle.setAttribute('aria-controls', 'nav-principal');
    menuToggle.setAttribute('aria-expanded', 'false');

    menuToggle.addEventListener('click', () => {
        navPrincipal.classList.contains('aberto') ? fecharMenu() : abrirMenu();
    });

    navPrincipal.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', fecharMenu);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) fecharMenu();
    });
})();
