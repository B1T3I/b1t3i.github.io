// =============================================
// times.js — Carrossel e troca de times
// Projeto CS Legacy — Miguel Arthur
// =============================================

// === DADOS DOS TIMES ===
// Cada time tem: imagens para o carrossel, logo, nome, descrição, conquista, país e destaque
const times = {
    vitality: {
        nome: "Team Vitality",
        logo: "../images/logos/vitalitylogo.png",
        descricao: "A Vitality é uma das organizações mais dominantes do CS2 moderno. Com ZywOo como pilar central, o time francês conquistou dois Majors consecutivos e se consolidou no topo do ranking mundial.",
        conquista: "Budapest Major 2025",
        pais: {
            nome: "França",
            bandeira: "../images/ui/bandeiras/france.svg.png"
        },
        destaque: "ZywOo",
        imagens: [
            "../images/times/vitality/win1.jpg",
            "../images/times/vitality/win2.jpeg",
            "../images/times/vitality/win3.jpg",
            "../images/times/vitality/win4.jpg",
            "../images/times/vitality/win5.jpg",
        ]
    },

    furia: {
        nome: "FURIA Esports",
        logo: "../images/logos/furialogo.png",
        descricao: "A FURIA é o orgulho do Brasil no CS2. Com um estilo agressivo e único, o time chegou ao topo do ranking mundial e conquistou títulos históricos, provando que o Brasil é uma potência real no cenário.",
        conquista: "IEM Chengdu 2025",
        pais: {
            nome: "Brasil",
            bandeira: "../images/ui/bandeiras/brazil.svg.png"
        },
        destaque: "KSCERATO",
        imagens: [
            "../images/times/furia/win5.jpg",
            "../images/times/furia/win1.jpg",
            "../images/times/furia/win2.jpg",
            "../images/times/furia/win3.jpg",
            "../images/times/furia/win4.jpg",
        ]
    },

    navi: {
        nome: "Natus Vincere",
        logo: "../images/logos/navilogo.png",
        descricao: "A NaVi é uma lenda do Counter-Strike. Com s1mple como rosto de uma era inteira, o time ucraniano conquistou o primeiro Major da era CS2 e segue sendo uma das organizações mais respeitadas do mundo.",
        conquista: "Copenhagen Major 2024",
        pais: {
            nome: "Ucrânia",
            bandeira: "../images/ui/bandeiras/ukraine.svg.png"
        },
        destaque: "S1mple",
        imagens: [
            "../images/times/natus/win1.jpg",
            "../images/times/natus/win2.png",
            "../images/times/natus/win3.png",
            "../images/times/natus/win4.png",
            "../images/times/natus/win5.jpg",
        ]
    },

    falcons: {
        nome: "Falcons Esports",
        logo: "../images/logos/falconslogo.png",
        descricao: "As Falcons surpreenderam o mundo ao conquistar seu primeiro troféu de forma improvável, saindo de 0-2 no Swiss Stage para campeãs. Com m0NESY como estrela, o time saudita é hoje uma força a ser respeitada.",
        conquista: "PGL Bucharest 2025",
        pais: {
            nome: "Arábia Saudita",
            bandeira: "../images/ui/bandeiras/saudi.svg.png"
        },
        destaque: "M0NESY",
        imagens: [
            "../images/times/falcons/win1.jpg",
            "../images/times/falcons/win2.jpg",
            "../images/times/falcons/win3.png",
            "../images/times/falcons/win4.jpg",
        ]
    },

    mouz: {
        nome: "MOUZ",
        logo: "../images/logos/mouzlogo.png",
        descricao: "A MOUZ é o projeto jovem que deu certo. Formada por talentos revelados pela própria academia, a equipe alemã se tornou a primeira a vencer três títulos globais da EPL, com xertioN como símbolo da geração.",
        conquista: "ESL Pro League S19",
        pais: {
            nome: "Alemanha",
            bandeira: "../images/ui/bandeiras/germany.svg.png"
        },
        destaque: "XertioN",
        imagens: [
            "../images/times/mouz/win1.jpg",
            "../images/times/mouz/win2.jpg",
            "../images/times/mouz/win3.jpg",
            "../images/times/mouz/win4.jpg",
            "../images/times/mouz/win5.png",
        ]
    }
};

// === ESTADO DO CARROSSEL ===
let timeAtual = "vitality";
let slideAtual = 0;
let intervalo = null;

// === SELEÇÃO DOS ELEMENTOS DO DOM ===
const track = document.getElementById("carrossel-track");
const dotsContainer = document.getElementById("carrossel-dots");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

// Card do time
const cardLogo = document.getElementById("card-logo");
const cardNome = document.getElementById("card-nome");
const cardDescricao = document.getElementById("card-descricao");
const cardConquista = document.getElementById("card-conquista");
const cardPais = document.getElementById("card-pais");
const cardDestaque = document.getElementById("card-destaque");

// === FUNÇÃO: CARREGAR TIME ===
// Chamada ao clicar em um botão de time ou ao iniciar a página
function carregarTime(id) {
    timeAtual = id;
    slideAtual = 0;

    const time = times[id];

    // Preenche o card com os dados do time
    cardLogo.src = time.logo;
    cardLogo.alt = time.nome;
    cardNome.textContent = time.nome;
    cardDescricao.textContent = time.descricao;
    cardConquista.textContent = time.conquista;

    // País com imagem da bandeira
    cardPais.innerHTML = `
        <img src="${time.pais.bandeira}" alt="Bandeira de ${time.pais.nome}" class="flag">
        <span>${time.pais.nome}</span>
    `;

    cardDestaque.textContent = time.destaque;

    // Monta as imagens do carrossel
    track.innerHTML = "";

    time.imagens.forEach(function (src) {
        const img = document.createElement("img");
        img.src = src;
        img.alt = time.nome;
        track.appendChild(img);
    });

    // Monta os dots
    dotsContainer.innerHTML = "";

    time.imagens.forEach(function (_, i) {
        const dot = document.createElement("div");
        dot.classList.add("dot");

        if (i === 0) {
            dot.classList.add("ativo");
        }

        dot.addEventListener("click", function () {
            irParaSlide(i);
            iniciarAutoplay();
        });

        dotsContainer.appendChild(dot);
    });

    // Atualiza botão ativo no seletor
    document.querySelectorAll(".btn-time").forEach(function (btn) {
        btn.classList.remove("ativo");

        if (btn.dataset.time === id) {
            btn.classList.add("ativo");
        }
    });

    irParaSlide(0);
    iniciarAutoplay();
}

// === FUNÇÃO: IR PARA SLIDE ===
function irParaSlide(index) {
    const total = times[timeAtual].imagens.length;

    if (index < 0) {
        index = total - 1;
    }

    if (index >= total) {
        index = 0;
    }

    slideAtual = index;

    track.style.transform = `translateX(-${slideAtual * 100}%)`;

    document.querySelectorAll(".dot").forEach(function (dot, i) {
        dot.classList.toggle("ativo", i === slideAtual);
    });
}

// === FUNÇÃO: AUTOPLAY ===
// Troca o slide automaticamente a cada 4 segundos
function iniciarAutoplay() {
    if (intervalo) {
        clearInterval(intervalo);
    }

    intervalo = setInterval(function () {
        irParaSlide(slideAtual + 1);
    }, 4000);
}

// === EVENTOS DOS BOTÕES DE NAVEGAÇÃO ===
btnPrev.addEventListener("click", function () {
    irParaSlide(slideAtual - 1);
    iniciarAutoplay();
});

btnNext.addEventListener("click", function () {
    irParaSlide(slideAtual + 1);
    iniciarAutoplay();
});

// === EVENTOS DOS BOTÕES DE TIME ===
document.querySelectorAll(".btn-time").forEach(function (btn) {
    btn.addEventListener("click", function () {
        carregarTime(btn.dataset.time);
    });
});

// === INICIALIZAÇÃO ===
// Carrega o primeiro time ao abrir a página
carregarTime("vitality");