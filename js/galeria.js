// =============================================
// galeria.js — Filtros, modal e navegação da galeria
// Projeto CS Legacy
// =============================================

// === ELEMENTOS ===
const botoesFiltro = document.querySelectorAll(".filtro-btn");
const secoesGaleria = document.querySelectorAll(".galeria-secao");
const cardsGaleria = document.querySelectorAll(".galeria-card");

const modal = document.getElementById("modal-galeria");
const modalImg = document.getElementById("modal-img");
const modalTitulo = document.getElementById("modal-titulo");
const modalDescricao = document.getElementById("modal-descricao");
const fecharModal = document.getElementById("fechar-modal");

const btnModalPrev = document.getElementById("modal-prev");
const btnModalNext = document.getElementById("modal-next");

// === ESTADO ===
let cardsVisiveis = [];
let cardAtualIndex = 0;

// === ATUALIZA CARDS VISÍVEIS ===
function atualizarCardsVisiveis() {
    cardsVisiveis = Array.from(cardsGaleria).filter(function (card) {
        const secaoPai = card.closest(".galeria-secao");
        const cardVisivel = card.style.display !== "none";
        const secaoVisivel = !secaoPai || !secaoPai.classList.contains("escondida");

        return cardVisivel && secaoVisivel;
    });
}

// === FILTROS ===
botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {
        const filtro = botao.dataset.filter;

        botoesFiltro.forEach(function (btn) {
            btn.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        // Mostra tudo
        if (filtro === "todos") {
            secoesGaleria.forEach(function (secao) {
                secao.classList.remove("escondida");
            });

            cardsGaleria.forEach(function (card) {
                card.style.display = "";
            });
        } 
        
        // Filtra por categoria
        else {
            secoesGaleria.forEach(function (secao) {
                const secaoFiltros = secao.dataset.secao || "";

                if (secaoFiltros.includes(filtro)) {
                    secao.classList.remove("escondida");
                } else {
                    secao.classList.add("escondida");
                }
            });

            cardsGaleria.forEach(function (card) {
                const categorias = card.dataset.category || "";

                if (categorias.includes(filtro)) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        }

        atualizarCardsVisiveis();
    });
});

// === ABRIR MODAL ===
function abrirModal(card) {
    if (!modal || !modalImg || !modalTitulo || !modalDescricao) {
        return;
    }

    atualizarCardsVisiveis();

    cardAtualIndex = cardsVisiveis.indexOf(card);

    const img = card.querySelector("img");
    const titulo = card.querySelector("h3");
    const descricao = card.querySelector("p");

    modalImg.src = img.src;
    modalImg.alt = img.alt;

    modalTitulo.textContent = titulo ? titulo.textContent : "";
    modalDescricao.textContent = descricao ? descricao.textContent : "";

    modal.classList.remove("modal-hidden");
}

// === FECHAR MODAL ===
function fecharGaleriaModal() {
    if (modal) {
        modal.classList.add("modal-hidden");
    }
}

// === TROCAR IMAGEM NO MODAL ===
function trocarImagemModal(direcao) {
    if (!modal || modal.classList.contains("modal-hidden")) {
        return;
    }

    if (cardsVisiveis.length === 0) {
        return;
    }

    cardAtualIndex += direcao;

    if (cardAtualIndex < 0) {
        cardAtualIndex = cardsVisiveis.length - 1;
    }

    if (cardAtualIndex >= cardsVisiveis.length) {
        cardAtualIndex = 0;
    }

    const card = cardsVisiveis[cardAtualIndex];

    const img = card.querySelector("img");
    const titulo = card.querySelector("h3");
    const descricao = card.querySelector("p");

    modalImg.src = img.src;
    modalImg.alt = img.alt;

    modalTitulo.textContent = titulo ? titulo.textContent : "";
    modalDescricao.textContent = descricao ? descricao.textContent : "";
}

// === CLIQUE NOS CARDS ===
cardsGaleria.forEach(function (card) {
    card.addEventListener("click", function () {
        abrirModal(card);
    });
});

// === BOTÃO FECHAR ===
if (fecharModal) {
    fecharModal.addEventListener("click", fecharGaleriaModal);
}

// === FECHAR CLICANDO FORA ===
if (modal) {
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            fecharGaleriaModal();
        }
    });
}

// === BOTÕES DO MODAL ===
if (btnModalPrev) {
    btnModalPrev.addEventListener("click", function (event) {
        event.stopPropagation();
        trocarImagemModal(-1);
    });
}

if (btnModalNext) {
    btnModalNext.addEventListener("click", function (event) {
        event.stopPropagation();
        trocarImagemModal(1);
    });
}

// === TECLADO ===
document.addEventListener("keydown", function (event) {
    if (!modal || modal.classList.contains("modal-hidden")) {
        return;
    }

    if (event.key === "Escape") {
        fecharGaleriaModal();
    }

    if (event.key === "ArrowLeft") {
        trocarImagemModal(-1);
    }

    if (event.key === "ArrowRight") {
        trocarImagemModal(1);
    }
});

// === INICIALIZAÇÃO ===
atualizarCardsVisiveis();