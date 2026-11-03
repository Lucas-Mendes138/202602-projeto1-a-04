// Etapa 4: abre e fecha o conteúdo ao clicar no cabeçalho
const cabecalho = document.querySelector('.etapa-atual__cabecalho');
const conteudoEtapa = document.querySelector('#etapa-4-conteudo');

cabecalho.addEventListener('click', () => {
  const aberta = cabecalho.getAttribute('aria-expanded') === 'true';
  cabecalho.setAttribute('aria-expanded', String(!aberta));
  conteudoEtapa.hidden = aberta;
});
