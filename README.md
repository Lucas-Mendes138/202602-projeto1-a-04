# Fatura Zero

> Projeto em Ciência de Dados I · Ibmec BH · 2º semestre de 2026
> Cliente: **Bulbe Energia** · Turma **A** · Squad **04**

O Fatura Zero é um app web que acompanha o cliente novo da Bulbe da adesão até o pagamento da primeira fatura, deixando claro o que pagar, para quem e quanto ele economiza.
---

## 1. Problema

O squad escolheu atacar a inadimplência da primeira fatura. Esse é o momento em que o cliente novo ainda não confia na Bulbe, passa a receber duas cobranças (Cemig e Bulbe) e não sabe qual pagar. Muitas vezes nem recebe a cobrança no canal que realmente usa. Na apresentação da Bulbe, cerca de 20% das mensagens não chegam ao cliente, e houve clientes que ficaram 20 dias sem nenhuma comunicação. Quem não recebe nem entende a fatura não paga.

- **Dor escolhida:** clientes que não recebem ou não entendem a 1ª fatura e, sem saber qual das duas contas pagar e com medo de golpe, deixam a cobrança da Bulbe de lado.
- **Evidência:** cerca de 20% de falha na entrega de mensagens e clientes até 20 dias sem comunicação, segundo a apresentação da Bulbe. Reforço: o modelo antigo de fatura não deixava claro o que era cobrado, e a adoção do Pix no pagamento de faturas cresceu mais de 50%.
- **Indicador que a solução pretende mover:** pagamento da 1ª fatura

## 2. Persona e jornada

- **Persona:** [nome fictício, idade, contexto em uma linha]
- **Mapa de jornada:** [docs/jornada.md](docs/jornada.md)

## 3. Solução

O Fatura Zero reúne, num só lugar, tudo que o cliente novo precisa até a primeira fatura:

1. antes de aderir, o que muda na conta dele;
2. durante a espera, avisos no canal que ele usa;
3. quando a fatura chega, uma explicação de qual conta pagar e o pagamento por Pix, com o comparativo de economia.

| Tela | O que faz | História relacionada |
| [Início] | [ ] | [HU01] |
| --- | --- | --- |
| Notificações | Mostra a etapa atual do pedido, a contagem para a próxima atualização, as últimas atualizações (com marcação de não lidas) e o interruptor "Resumo a cada 15 dias" | HU01 |
| O que muda na sua conta	| Antes de confirmar a adesão, mostra que a conta da Cemig continua chegando mas só a da Bulbe é paga, quanto o cliente vai pagar e economizar, e quando chega a 1ª fatura|	HU02 |
| Como funciona o pagamento |	Explica o passo a passo da adesão até a 1ª fatura, mostra lado a lado a fatura da Bulbe (“pagar”) e a conta da Cemig (“não pagar”) e ensina a conferir se a fatura é verdadeira| HU03 |
| Meus créditos | Mostra o saldo de créditos em kWh e em reais, a evolução dos últimos meses e o que acontece com os créditos se o cliente cancelar| HU04 |
| Faturas (pagar com Pix)	| Mostra a fatura do mês com valor, vencimento, consumo e o comparativo “sem a Bulbe / com a Bulbe”, além do Pix copia e cola e do download da fatura em PDF | HU05 |

- **Histórias de usuário:** [docs/historias.md](docs/historias.md)
- **Wireframes:** [docs/wireframes/](docs/wireframes/)

## 4. Tecnologias

- HTML, CSS e JavaScript puro (vanilla)
- Dados fictícios em JSON, lidos com `fetch` (pasta [`data/`](data/))
- Git e GitHub (Issues, Projects e Pull Requests)

## 5. Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/[usuario]/202602-projeto1-[turma]-[squad].git
   ```
2. Abra a pasta no VS Code.
3. Instale a extensão **Live Server** (o VS Code vai sugerir automaticamente).
4. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.

> Abrir o `index.html` direto no navegador (duplo clique) não funciona: o `fetch` dos arquivos JSON exige um servidor.

## 6. Estrutura do repositório

```
├── index.html            # Página inicial
├── pages/                # Demais telas da solução
├── assets/
│   ├── css/style.css     # Estilos
│   ├── js/main.js        # Lógica da página inicial
│   ├── js/api.js         # Leitura dos dados (fetch)
│   └── img/              # Imagens e ícones
├── data/                 # Dados fictícios em JSON
├── docs/                 # Jornada, histórias, wireframes e sprints
└── .github/              # Modelos de Issue e de Pull Request
```

## 7. Quadro do projeto

- **GitHub Projects:** (https://github.com/users/Lucas-Mendes138/projects/1/views/1)

## 8. Equipe

| Integrante | GitHub | Papel principal |
| --- | --- | --- |
| Lucas Mendes | Lucas-Mendes138 (https://github.com/Lucas-Mendes138) |Documentação|
| Heitor Silva | heitormarquessilva (https://github.com/heitormarquessilva) |Product Owner|
| Alvaro Abranches | alvaroabranchess-afk (https://github.com/alvaroabranchess-afk)|Scrum Master|
| Gabriel Scarpat | gabrielscarpat (https://github.com/gabrielscarpat) |Front-End|
| Bruno Veras | brunonogveras (https://github.com/brunonogveras) |Dados|


## 9. Entregas

| Marco | Aula | Status |
| --- | --- | --- |
| Mapa de jornada | 19 | [ ] |
| Histórias de usuário | 20 | [ ] |
| Wireframes | 21–23 | [ ] |
| Sprint Review I | 24 | [ ] |
| Implementação | 25–28 | [ ] |
| Sprint Review II | 29 | [ ] |
| Versão final | 30 | [ ] |

---

> Todos os dados deste repositório são fictícios. Nenhum dado real de cliente da Bulbe Energia é utilizado.
