// =============================================
// galeria.js — Filtros, modal e navegação da galeria
// Projeto CS Legacy
// =============================================

// === ELEMENTOS PRINCIPAIS ===
const botoesFiltro = document.querySelectorAll(".filtro-btn");
const cardsGaleria = document.querySelectorAll(".galeria-card");

const modal = document.getElementById("modal-galeria");
const modalImg = document.getElementById("modal-img");
const modalTitulo = document.getElementById("modal-titulo");
const modalDescricao = document.getElementById("modal-descricao");
const fecharModal = document.getElementById("fechar-modal");

const btnModalPrev = document.getElementById("modal-prev");
const btnModalNext = document.getElementById("modal-next");

// === ESTADO DA GALERIA ===
let cardsVisiveis = Array.from(cardsGaleria);
let cardAtualIndex = 0;

// === FILTROS ===
botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {
        const filtro = botao.dataset.filter;

        botoesFiltro.forEach(function (btn) {
            btn.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        cardsGaleria.forEach(function (card) {
            const categorias = card.dataset.category;

            if (filtro === "todos" || categorias.includes(filtro)) {
                card.classList.remove("escondido");
            } else {
                card.classList.add("escondido");
            }
        });

        atualizarCardsVisiveis();
    });
});

// === ATUALIZA LISTA DE CARDS VISÍVEIS ===
function atualizarCardsVisiveis() {
    cardsVisiveis = Array.from(cardsGaleria).filter(function (card) {
        return !card.classList.contains("escondido");
    });
}

// === ABRIR MODAL ===
function abrirModal(card) {
    atualizarCardsVisiveis();

    cardAtualIndex = cardsVisiveis.indexOf(card);

    const img = card.querySelector("img");
    const titulo = card.querySelector("h3").textContent;
    const descricao = card.querySelector("p").textContent;

    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalTitulo.textContent = titulo;
    modalDescricao.textContent = descricao;

    modal.classList.remove("modal-hidden");
}

// === FECHAR MODAL ===
function fecharGaleriaModal() {
    modal.classList.add("modal-hidden");
}

// === TROCAR IMAGEM NO MODAL ===
function trocarImagemModal(direcao) {
    if (modal.classList.contains("modal-hidden")) {
        return;
    }

    cardAtualIndex += direcao;

    if (cardAtualIndex < 0) {
        cardAtualIndex = cardsVisiveis.length - 1;
    }

    if (cardAtualIndex >= cardsVisiveis.length) {
        cardAtualIndex = 0;
    }

    const novoCard = cardsVisiveis[cardAtualIndex];
    const img = novoCard.querySelector("img");
    const titulo = novoCard.querySelector("h3").textContent;
    const descricao = novoCard.querySelector("p").textContent;

    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalTitulo.textContent = titulo;
    modalDescricao.textContent = descricao;
}

// === CLIQUE NOS CARDS ===
cardsGaleria.forEach(function (card) {
    card.addEventListener("click", function () {
        abrirModal(card);
    });
});

// === EVENTOS DO MODAL ===
fecharModal.addEventListener("click", fecharGaleriaModal);

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        fecharGaleriaModal();
    }
});

// Botões internos do modal
if (btnModalPrev && btnModalNext) {
    btnModalPrev.addEventListener("click", function () {
        trocarImagemModal(-1);
    });

    btnModalNext.addEventListener("click", function () {
        trocarImagemModal(1);
    });
}

// Teclado
document.addEventListener("keydown", function (event) {
    if (modal.classList.contains("modal-hidden")) {
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

// Inicializa lista visível
atualizarCardsVisiveis();