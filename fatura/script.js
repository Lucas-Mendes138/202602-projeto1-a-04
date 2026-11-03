import { buscarFaturas } from '../assets/js/api.js';

// Etapa 4: abre e fecha o conteúdo ao clicar no cabeçalho
const cabecalho = document.querySelector('.etapa-atual__cabecalho');
const conteudoEtapa = document.querySelector('#etapa-4-conteudo');

cabecalho.addEventListener('click', () => {
  const aberta = cabecalho.getAttribute('aria-expanded') === 'true';
  cabecalho.setAttribute('aria-expanded', String(!aberta));
  conteudoEtapa.hidden = aberta;
});

// Pagar com PIX: copia o código da fatura em aberto (data/faturas.json)
const botaoPix = document.querySelector('#botao-pix');
const mensagemPix = document.querySelector('#mensagem-pix');
let codigoPix = null;

async function carregarFatura() {
  try {
    const faturas = await buscarFaturas();
    const fatura = faturas.find((f) => f.status === 'aberta' && f.pixCopiaECola);
    codigoPix = fatura ? fatura.pixCopiaECola : null;
  } catch (erro) {
    console.error(erro);
  }
}

botaoPix.addEventListener('click', async () => {
  if (!codigoPix) {
    mensagemPix.textContent = 'Nenhuma fatura em aberto para pagar.';
    return;
  }

  try {
    await navigator.clipboard.writeText(codigoPix);
    mensagemPix.textContent = 'Código PIX copiado. Cole no app do seu banco.';
  } catch (erro) {
    // se o navegador não deixar copiar, mostra o código para a pessoa copiar
    mensagemPix.textContent = `Copie o código PIX: ${codigoPix}`;
  }
});

carregarFatura();
