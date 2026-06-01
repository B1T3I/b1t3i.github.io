// =============================================
// ferramentas.js — Gerador de Bind e Conversor de Sensibilidade
// Projeto CS Legacy — Miguel Arthur
// =============================================

// Garante que o script só rode depois do HTML carregar.
document.addEventListener('DOMContentLoaded', function () {
    // =============================================
    // TABS
    // =============================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const alvo = btn.dataset.tab;
            const conteudoAlvo = document.getElementById('tab-' + alvo);

            if (!conteudoAlvo) return;

            tabBtns.forEach(function (b) {
                b.classList.remove('ativo');
            });

            tabContents.forEach(function (c) {
                c.classList.remove('ativo');
            });

            btn.classList.add('ativo');
            conteudoAlvo.classList.add('ativo');
        });
    });

    // =============================================
    // GERADOR DE BIND DE COMPRA
    // =============================================
    const teclas = document.querySelectorAll('.tecla');
    const armaBtns = document.querySelectorAll('.arma-btn');
    const teclaDisplayTexto = document.getElementById('tecla-display-texto');
    const btnLimparTecla = document.getElementById('btn-limpar-tecla');
    const itensLista = document.getElementById('itens-lista');
    const itensVazio = document.getElementById('itens-vazio');
    const btnLimparItens = document.getElementById('btn-limpar-itens');
    const btnGerarBind = document.getElementById('btn-gerar-bind');
    const resultadoBind = document.getElementById('resultado-bind');
    const bindOutput = document.getElementById('bind-output');
    const btnCopiarBind = document.getElementById('btn-copiar-bind');

    let teclaSelecionada = '';
    let itensSelecionados = [];

    function atualizarTeclaSelecionada() {
        teclas.forEach(function (tecla) {
            tecla.classList.toggle('selecionada', tecla.dataset.key === teclaSelecionada);
        });

        if (teclaSelecionada) {
            teclaDisplayTexto.textContent = teclaSelecionada;
            teclaDisplayTexto.classList.add('ativa');
            btnLimparTecla.style.display = 'inline-block';
        } else {
            teclaDisplayTexto.textContent = 'Nenhuma tecla selecionada';
            teclaDisplayTexto.classList.remove('ativa');
            btnLimparTecla.style.display = 'none';
        }
    }

    function atualizarItensSelecionados() {
        armaBtns.forEach(function (btn) {
            btn.classList.toggle('selecionada', itensSelecionados.includes(btn.dataset.buy));
        });

        itensLista.innerHTML = '';

        if (itensSelecionados.length === 0) {
            itensLista.appendChild(itensVazio);
            itensVazio.style.display = 'inline';
            btnLimparItens.style.display = 'none';
            return;
        }

        btnLimparItens.style.display = 'inline-block';

        itensSelecionados.forEach(function (comando) {
            const itemBtn = document.querySelector('.arma-btn[data-buy="' + comando + '"]');
            const nome = itemBtn ? itemBtn.childNodes[0].textContent.trim() : comando.replace('buy ', '');

            const tag = document.createElement('span');
            tag.className = 'item-tag';
            tag.textContent = nome;
            itensLista.appendChild(tag);
        });
    }

    teclas.forEach(function (tecla) {
        tecla.addEventListener('click', function () {
            teclaSelecionada = tecla.dataset.key;
            atualizarTeclaSelecionada();
        });
    });

    btnLimparTecla.addEventListener('click', function () {
        teclaSelecionada = '';
        atualizarTeclaSelecionada();
        resultadoBind.style.display = 'none';
    });

    armaBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const comando = btn.dataset.buy;

            if (itensSelecionados.includes(comando)) {
                itensSelecionados = itensSelecionados.filter(function (item) {
                    return item !== comando;
                });
            } else {
                itensSelecionados.push(comando);
            }

            atualizarItensSelecionados();
        });
    });

    btnLimparItens.addEventListener('click', function () {
        itensSelecionados = [];
        atualizarItensSelecionados();
        resultadoBind.style.display = 'none';
    });

    btnGerarBind.addEventListener('click', function () {
        if (!teclaSelecionada) {
            alert('Selecione uma tecla no teclado virtual. Sim, o botão precisa saber qual botão ele é.');
            return;
        }

        if (itensSelecionados.length === 0) {
            alert('Selecione pelo menos um item para comprar. Bind vazio é só decoração triste.');
            return;
        }

        const comandosCompra = itensSelecionados.join('; ');
        const comandoFinal = 'bind "' + teclaSelecionada.toLowerCase() + '" "' + comandosCompra + '"';

        bindOutput.textContent = comandoFinal;
        resultadoBind.style.display = 'flex';
    });

    btnCopiarBind.addEventListener('click', function () {
        copiarTexto(bindOutput.textContent, btnCopiarBind);
    });

    // =============================================
    // CONVERSOR DE SENSIBILIDADE
    // =============================================
    const jogos = {
        cs2: {
            nome: 'Counter-Strike 2',
            yaw: 0.022
        },
        valorant: {
            nome: 'Valorant',
            yaw: 0.07
        },
        apex: {
            nome: 'Apex Legends',
            yaw: 0.022
        },
        fortnite: {
            nome: 'Fortnite',
            yaw: 0.005555
        },
        overwatch: {
            nome: 'Overwatch 2',
            yaw: 0.0066
        },
        r6: {
            nome: 'Rainbow Six Siege',
            yaw: 0.005729
        },
        pubg: {
            nome: 'PUBG',
            yaw: 0.022
        }
    };

    const sensiDe = document.getElementById('sensi-de');
    const sensiPara = document.getElementById('sensi-para');
    const sensiValor = document.getElementById('sensi-valor');
    const sensiDpi = document.getElementById('sensi-dpi');
    const btnConverterSensi = document.getElementById('btn-converter-sensi');
    const resultadoSensi = document.getElementById('resultado-sensi');
    const edpiOriginal = document.getElementById('edpi-original');
    const sensiConvertida = document.getElementById('sensi-convertida');
    const edpiConvertido = document.getElementById('edpi-convertido');
    const cm360 = document.getElementById('cm360');

    function preencherSelectsDeJogos() {
        Object.keys(jogos).forEach(function (chave) {
            const optionDe = document.createElement('option');
            optionDe.value = chave;
            optionDe.textContent = jogos[chave].nome;
            sensiDe.appendChild(optionDe);

            const optionPara = document.createElement('option');
            optionPara.value = chave;
            optionPara.textContent = jogos[chave].nome;
            sensiPara.appendChild(optionPara);
        });

        sensiDe.value = 'cs2';
        sensiPara.value = 'valorant';
    }

    function calcularCm360(dpi, sensibilidade, yaw) {
        return (360 * 2.54) / (dpi * sensibilidade * yaw);
    }

    function formatarNumero(numero, casas) {
        return Number(numero).toLocaleString('pt-BR', {
            minimumFractionDigits: casas,
            maximumFractionDigits: casas
        });
    }

    btnConverterSensi.addEventListener('click', function () {
        const jogoOrigem = jogos[sensiDe.value];
        const jogoDestino = jogos[sensiPara.value];
        const sensibilidadeOriginal = parseFloat(sensiValor.value);
        const dpi = parseFloat(sensiDpi.value);

        if (!jogoOrigem || !jogoDestino) {
            alert('Selecione os jogos corretamente. Difícil converter o nada para coisa nenhuma.');
            return;
        }

        if (Number.isNaN(sensibilidadeOriginal) || sensibilidadeOriginal <= 0) {
            alert('Digite uma sensibilidade válida. Número positivo, por favor, sem alquimia.');
            return;
        }

        if (Number.isNaN(dpi) || dpi < 100 || dpi > 25600) {
            alert('Digite um DPI entre 100 e 25600. O mouse ainda precisa respeitar as leis da física.');
            return;
        }

        const sensibilidadeFinal = sensibilidadeOriginal * (jogoOrigem.yaw / jogoDestino.yaw);
        const edpiOrigemValor = dpi * sensibilidadeOriginal;
        const edpiDestinoValor = dpi * sensibilidadeFinal;
        const cm360Valor = calcularCm360(dpi, sensibilidadeOriginal, jogoOrigem.yaw);

        edpiOriginal.textContent = formatarNumero(edpiOrigemValor, 0);
        sensiConvertida.textContent = formatarNumero(sensibilidadeFinal, 3);
        edpiConvertido.textContent = formatarNumero(edpiDestinoValor, 0);
        cm360.textContent = formatarNumero(cm360Valor, 2) + ' cm';

        resultadoSensi.style.display = 'flex';
    });

    preencherSelectsDeJogos();
    atualizarTeclaSelecionada();
    atualizarItensSelecionados();

    // =============================================
    // FUNÇÕES AUXILIARES
    // =============================================
    function copiarTexto(texto, botao) {
        if (!texto) return;

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(texto).then(function () {
                mostrarCopiado(botao);
            }).catch(function () {
                copiarTextoFallback(texto, botao);
            });
        } else {
            copiarTextoFallback(texto, botao);
        }
    }

    function copiarTextoFallback(texto, botao) {
        const textarea = document.createElement('textarea');
        textarea.value = texto;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        mostrarCopiado(botao);
    }

    function mostrarCopiado(botao) {
        const textoOriginal = botao.textContent;
        botao.textContent = '✅';

        setTimeout(function () {
            botao.textContent = textoOriginal;
        }, 1500);
    }
});
