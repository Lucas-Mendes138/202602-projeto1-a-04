import { buscarFaturas } from '../../assets/js/api.js';

// Etapa 4: abre e fecha o conteúdo ao clicar no cabeçalho
const cabecalho = document.querySelector('.etapa-atual__cabecalho');
const conteudoEtapa = document.querySelector('#etapa-4-conteudo');

cabecalho.addEventListener('click', () => {
  const aberta = cabecalho.getAttribute('aria-expanded') === 'true';
  cabecalho.setAttribute('aria-expanded', String(!aberta));
  conteudoEtapa.hidden = aberta;
});

// ===== Formas de pagamento =====
const mensagem = document.querySelector('#pagar-mensagem');

function avisar(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.classList.toggle('pagar__mensagem--erro', erro);
}

// valor e vencimento da fatura em aberto (data/faturas.json)
const reais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

async function carregarFatura() {
  try {
    const faturas = await buscarFaturas();
    const fatura = faturas.find((f) => f.status === 'aberta');
    if (!fatura) return;

    const [ano, mes, dia] = fatura.vencimento.split('-');
    const valor = reais.format(fatura.valor);
    document.querySelector('#pagar-valor').textContent = valor;
    document.querySelector('#pagar-vencimento').textContent = `${dia}/${mes}/${ano}`;
    document.querySelector('#botao-cartao').textContent = `Pagar ${valor}`;
    if (fatura.pixCopiaECola) {
      document.querySelector('#codigo-pix').textContent = fatura.pixCopiaECola;
    }
  } catch (erro) {
    // sem o JSON (arquivo aberto fora do Live Server), a tela usa os valores do HTML
    console.error(erro);
  }
}

// seletor Pix | Boleto | Cartão
const abas = [...document.querySelectorAll('.seletor__opcao')];

function selecionar(aba) {
  abas.forEach((item) => {
    const ativa = item === aba;
    item.setAttribute('aria-selected', String(ativa));
    item.tabIndex = ativa ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !ativa;
  });
  avisar('');
}

abas.forEach((aba, i) => {
  aba.addEventListener('click', () => selecionar(aba));
  // setas do teclado trocam de opção
  aba.addEventListener('keydown', (evento) => {
    const passo = { ArrowRight: 1, ArrowLeft: -1 }[evento.key];
    if (!passo) return;
    const proxima = abas[(i + passo + abas.length) % abas.length];
    selecionar(proxima);
    proxima.focus();
  });
});

// botões de copiar (código Pix e linha digitável)
document.querySelectorAll('[data-copiar]').forEach((botao) => {
  botao.addEventListener('click', async () => {
    const alvo = document.getElementById(botao.dataset.copiar);
    const texto = alvo.textContent.trim();
    try {
      await navigator.clipboard.writeText(texto);
      avisar('Copiado! Agora é só colar no app do seu banco.');
    } catch (erro) {
      // se o navegador não deixar copiar, deixa o texto selecionado para a pessoa copiar
      window.getSelection().selectAllChildren(alvo);
      avisar('O código está selecionado. É só copiar.');
    }
  });
});

// cartão de crédito: formata os campos enquanto a pessoa digita
const numero = document.querySelector('#cartao-numero');
const nome = document.querySelector('#cartao-nome');
const validade = document.querySelector('#cartao-validade');
const cvv = document.querySelector('#cartao-cvv');

const soNumeros = (texto) => texto.replace(/\D/g, '');

numero.addEventListener('input', () => {
  numero.value = soNumeros(numero.value).slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
});

validade.addEventListener('input', () => {
  const digitos = soNumeros(validade.value).slice(0, 4);
  validade.value = digitos.length > 2 ? `${digitos.slice(0, 2)}/${digitos.slice(2)}` : digitos;
});

cvv.addEventListener('input', () => {
  cvv.value = soNumeros(cvv.value).slice(0, 4);
});

function marcar(campo, valido) {
  campo.setAttribute('aria-invalid', String(!valido));
  return valido;
}

document.querySelector('#painel-cartao').addEventListener('submit', (evento) => {
  evento.preventDefault();

  const mes = Number(validade.value.slice(0, 2));
  const resultados = [
    marcar(numero, soNumeros(numero.value).length === 16),
    marcar(nome, nome.value.trim().length > 2),
    marcar(validade, /^\d{2}\/\d{2}$/.test(validade.value) && mes >= 1 && mes <= 12),
    marcar(cvv, cvv.value.length >= 3),
  ];

  if (resultados.includes(false)) {
    avisar('Confira os dados do cartão marcados em vermelho.', true);
    return;
  }

  // protótipo: nenhum pagamento é feito de verdade
  avisar(`Pagamento de ${document.querySelector('#pagar-valor').textContent} aprovado (simulação).`);
  evento.target.reset();
});

carregarFatura();
