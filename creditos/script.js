// Tela Créditos (HU04): preenche a tela com os dados de data/creditos.json.
// O HTML já traz valores de exemplo; se os dados não carregarem
// (por exemplo, arquivo aberto sem o Live Server), a tela continua igual.

import { buscarCreditosDoCliente } from '../assets/js/api.js';

// cliente fictício da Persona 4 (Ricardo Almeida) em data/clientes.json
const CLIENTE_ID = 4;

// ===== Formatação no padrão brasileiro =====
const formatoKwh = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatoInteiro = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
const formatoReais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

// "2026-10" → objeto Date no dia 1 daquele mês
function dataDoMes(referencia) {
  const [ano, mes] = referencia.split('-').map(Number);
  return new Date(ano, mes - 1, 1);
}

// "2026-10" → "out"
function mesCurto(referencia) {
  return dataDoMes(referencia)
    .toLocaleDateString('pt-BR', { month: 'short' })
    .replace('.', '');
}

// "2026-10" → "outubro"
function mesLongo(referencia) {
  return dataDoMes(referencia).toLocaleDateString('pt-BR', { month: 'long' });
}

// "2026-10-05" → "05/10/2026"
function dataBrasileira(iso) {
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

function escrever(id, texto) {
  document.getElementById(id).textContent = texto;
}

// ===== Saldo, resumo do mês e aviso de cancelamento =====
function mostrarSaldo(dados) {
  const saldoKwh = dados.historico.at(-1).saldoKwh;
  const saldoReais = saldoKwh * dados.tarifaKwh;

  const elementoKwh = document.getElementById('saldo-kwh');
  elementoKwh.textContent = formatoKwh.format(saldoKwh);
  elementoKwh.value = saldoKwh;

  escrever('saldo-reais', formatoReais.format(saldoReais));
  escrever('valor-quitar', formatoReais.format(saldoReais));
  escrever('prazo-meses', dados.prazoConsumoMeses);
  escrever('instalacao', dados.instalacao);

  const elementoData = document.getElementById('saldo-data');
  elementoData.dateTime = dados.atualizadoEm;
  elementoData.textContent = dataBrasileira(dados.atualizadoEm);
  escrever('saldo-mes', mesLongo(dados.mesAtual.referencia));

  escrever('mes-gerados', `+ ${formatoInteiro.format(dados.mesAtual.geradosKwh)} kWh`);
  escrever('mes-usados', `− ${formatoInteiro.format(dados.mesAtual.usadosKwh)} kWh`);
}

// ===== Gráfico "Evolução do saldo" =====
// a altura de cada barra é proporcional ao maior saldo do período
function mostrarGrafico(historico) {
  const barras = document.getElementById('grafico-barras');
  const meses = document.getElementById('grafico-meses');
  const maior = Math.max(...historico.map((item) => item.saldoKwh));

  barras.innerHTML = '';
  meses.innerHTML = '';

  historico.forEach((item, indice) => {
    const atual = indice === historico.length - 1;
    const valor = `${formatoInteiro.format(item.saldoKwh)} kWh`;

    const barra = document.createElement('li');
    barra.style.setProperty('--altura', `${Math.round((item.saldoKwh / maior) * 100)}%`);
    if (atual) {
      barra.classList.add('atual');
      barra.dataset.valor = valor;
    }

    // texto escondido para leitores de tela: "outubro: 512 kWh"
    const descricao = document.createElement('span');
    descricao.className = 'creditos__sr';
    descricao.textContent = `${mesLongo(item.referencia)}: ${valor}`;
    barra.append(descricao);
    barras.append(barra);

    const rotulo = document.createElement('span');
    rotulo.textContent = mesCurto(item.referencia);
    if (atual) {
      rotulo.classList.add('atual');
    }
    meses.append(rotulo);
  });
}

async function iniciar() {
  try {
    const dados = await buscarCreditosDoCliente(CLIENTE_ID);
    if (!dados) {
      console.warn(`Nenhum crédito encontrado para o cliente ${CLIENTE_ID}.`);
      return;
    }
    mostrarSaldo(dados);
    mostrarGrafico(dados.historico);
  } catch (erro) {
    // mantém os valores de exemplo do HTML
    console.warn('Não foi possível carregar os créditos. O projeto está aberto pelo Live Server?', erro);
  }
}

iniciar();
