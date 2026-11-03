// Tela de conversão: complementa as interações que já funcionam só com CSS
// (:target para os painéis e a tela de sucesso, :has para o botão).
// Sem JavaScript a tela continua funcionando; com ele fica mais clara e acessível.

// ===== Aceite obrigatório antes de confirmar a adesão =====
const formulario = document.querySelector('form.main-card');
const aceite = document.querySelector('#aceite');
const erroAceite = document.querySelector('#aceite-erro');
const botaoConfirmar = formulario.querySelector('button[type="submit"]');

// mostra a nossa mensagem no lugar do balão padrão do navegador
formulario.noValidate = true;

function atualizarBotao() {
  botaoConfirmar.setAttribute('aria-disabled', String(!aceite.checked));
  if (aceite.checked) {
    erroAceite.hidden = true;
  }
}

aceite.addEventListener('change', atualizarBotao);

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  if (!aceite.checked) {
    erroAceite.hidden = false;
    aceite.focus();
    return;
  }

  // abre a tela de sucesso sem deixar "?aceite=on" no endereço;
  // "Voltar ao resumo" devolve a pessoa para este mesmo ponto
  focoAnterior = botaoConfirmar;
  rolagemAnterior = window.scrollY;
  location.hash = 'sucesso';
});

atualizarBotao();

// ===== Painéis (Entenda, Indique, Garantias) e tela de sucesso =====
const paineis = document.querySelectorAll('.sheet');
let focoAnterior = null;
let rolagemAnterior = 0;

function painelAberto() {
  return [...paineis].find((painel) => `#${painel.id}` === location.hash) ?? null;
}

// leva o foco para o título da tela que abriu, sem rolar a página
function focarTitulo(tela) {
  const titulo = tela.querySelector('h2');
  titulo.tabIndex = -1;
  titulo.focus({ preventScroll: true });
}

function aoTrocarTela() {
  const painel = painelAberto();
  const sucesso = location.hash === '#sucesso' ? document.querySelector('#sucesso') : null;

  // trava a rolagem do fundo enquanto um painel está aberto
  document.body.classList.toggle('painel-aberto', Boolean(painel));

  if (painel || sucesso) {
    focarTitulo(painel ?? sucesso);
    return;
  }

  // painel fechado: volta o foco para o chip que abriu
  if (focoAnterior) {
    focoAnterior.focus({ preventScroll: true });
    focoAnterior = null;
  }
}

// guarda de onde a pessoa abriu o painel
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => {
  link.addEventListener('click', () => {
    focoAnterior = link;
    rolagemAnterior = window.scrollY;
  });
});

// fechar (X, fundo escuro, "Entendi", "Agora não", "Voltar ao resumo")
// sem a página pular para o topo, como acontece com href="#"
function fechar() {
  location.hash = '';
  window.scrollTo(0, rolagemAnterior);
}

document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener('click', (evento) => {
    evento.preventDefault();
    fechar();
  });
});

// tecla Esc fecha o painel aberto
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape' && painelAberto()) {
    fechar();
  }
});

window.addEventListener('hashchange', aoTrocarTela);
aoTrocarTela();

// ===== Indique e Ganhe: copiar o código =====
const codigo = document.querySelector('#codigo-indicacao');
const statusCodigo = document.querySelector('#codigo-status');

codigo.setAttribute('role', 'button');
codigo.tabIndex = 0;
codigo.setAttribute('aria-label', `Copiar código ${codigo.textContent.trim()}`);

async function copiarCodigo() {
  try {
    await navigator.clipboard.writeText(codigo.textContent.trim());
    statusCodigo.textContent = 'Código copiado. É só colar na mensagem.';
  } catch (erro) {
    // se o navegador não deixar copiar, deixa o código selecionado para a pessoa copiar
    window.getSelection().selectAllChildren(codigo);
    statusCodigo.textContent = 'Código selecionado. É só copiar.';
  }
  statusCodigo.hidden = false;
}

codigo.addEventListener('click', copiarCodigo);
codigo.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter' || evento.key === ' ') {
    evento.preventDefault();
    copiarCodigo();
  }
});
