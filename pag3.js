//Parte do conômetro
let startTime;
let intervalId;
const cronometroElement = document.getElementById('cronometro');
const tempoLimite = 1 * 60 + 15; // 1 minuto e 15 segundos em segundos

document.addEventListener('click', () => {
  if (!startTime) {
    startTime = Date.now() / 1000; // Converte para segundos
    intervalId = setInterval(atualizarCronometro, 1000);
  } else {
    clearInterval(intervalId);
    startTime = null;
    cronometroElement.textContent = '0:00'; // Reinicia o cronômetro
  }
});

function atualizarCronometro() {
  const currentTime = Date.now() / 1000; // Converte para segundos
  const elapsedTime = currentTime - startTime;

  if (elapsedTime >= tempoLimite) {
    clearInterval(intervalId);
    startTime = null;
    cronometroElement.textContent = '1:15'; // Exibe o tempo limite quando atingido
  } else {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = Math.floor(elapsedTime % 60);
    cronometroElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}

let titulo = document.querySelector('h1')
let instrucoes = document.querySelector('#instrucoes')
let aviso = document.querySelector('#aviso')
//let respostaEsta = document.querySelector('#respostaEsta')
let pontos = 0 // pontos para o placar
let placar = 0 // placar

// PERGUNTA
let numQuestao = document.querySelector('#numQuestao')
let pergunta   = document.querySelector('#pergunta')

// ALTERNATIVAS
let a = document.querySelector('#a')
let b = document.querySelector('#b')
let c = document.querySelector('#c')


// article com a class questoes
let articleQuestoes = document.querySelector('.questoes')
// ol li com as alternativas
let alternativas = document.querySelector('#alternativas')

const q0 = {
    numQuestao   : 0,
    pergunta     : "Pergunta",
    alternativaA : "Alternativa A",
    alternativaB : "Alternativa B",
    alternativaC : "Alternativa C",
    correta      : "0",
}

const q1 = {
    numQuestao   : 1,
    pergunta     : "O que vem antes do Quatrilhão?",
    alternativaA : "quadrilhão",
    alternativaB : "bilhão",
    alternativaC : "trilhão",
    correta      : "trilhão",
}

const q2 = {
    numQuestao   : 2,
    pergunta     : "Valor de Pi?",
    alternativaA : "3.14159",
    alternativaB : "3.14",
    alternativaC : "2.14", 
    correta      : "3.14159",
}

const q3 = {
    numQuestao   : 3,
    pergunta     : "Quem é o cientista que nasceu no Dia do Pi?",
    alternativaA : "Albert Einstein",
    alternativaB : "Fermat",
    alternativaC : "Newton",
    correta      : "Albert Einstein",
}

const q4 = {
    numQuestao   : 4,
    pergunta     : "Qual é o último mês do ano com 31 dias",
    alternativaA : "janeiro",
    alternativaB : "março",
    alternativaC : "dezembro",
    correta      : "dezembro",
}

const q5 = {
    numQuestao   : 5,
    pergunta     : "Qual é a 'receita' matemática para resolver algo?",
    alternativaA : "escala",
    alternativaB : "fórmula",
    alternativaC : "fração",
    correta      : "fórmula",
}

// CONSTANTE COM UM ARRAY DE OBJETOS COM TODAS AS QUESTOES
const questoes = [q0, q1, q2, q3, q4, q5]

let numero = document.querySelector('#numero')
let total  = document.querySelector('#total')

numero.textContent = q1.numQuestao

let totalDeQuestoes = (questoes.length)-1
console.log("Total de questões " + totalDeQuestoes)
total.textContent = totalDeQuestoes

// MONTAR A 1a QUESTAO COMPLETA, para iniciar o Quiz
numQuestao.textContent = q1.numQuestao
pergunta.textContent   = q1.pergunta
a.textContent = q1.alternativaA
b.textContent = q1.alternativaB
c.textContent = q1.alternativaC



// CONFIGURAR O VALUE INICIAL DA 1a QUESTAO COMPLETA
a.setAttribute('value', '1A')
b.setAttribute('value', '1B')
c.setAttribute('value', '1C')



// PARA MONTAR AS PROXIMAS QUESTOES
function proximaQuestao(nQuestao) {
    numero.textContent = nQuestao
    numQuestao.textContent = questoes[nQuestao].numQuestao
    pergunta.textContent   = questoes[nQuestao].pergunta
    a.textContent = questoes[nQuestao].alternativaA
    b.textContent = questoes[nQuestao].alternativaB
    c.textContent = questoes[nQuestao].alternativaC
    a.setAttribute('value', nQuestao+'A')
    b.setAttribute('value', nQuestao+'B')
    c.setAttribute('value', nQuestao+'C')
    
}

function bloquearAlternativas() {
    a.classList.add('bloqueado')
    b.classList.add('bloqueado')
    c.classList.add('bloqueado')

}

function desbloquearAlternativas() {
    a.classList.remove('bloqueado')
    b.classList.remove('bloqueado')
    c.classList.remove('bloqueado')
   
}

function verificarSeAcertou(nQuestao, resposta) {

    let numeroDaQuestao = nQuestao.value
    console.log("Questão " + numeroDaQuestao)

    let respostaEscolhida = resposta.textContent
    //console.log("RespU " + respostaEscolhida)

    let certa = questoes[numeroDaQuestao].correta
    //console.log("RespC " + certa)

    if(respostaEscolhida == certa) {
        //console.log("Acertou")
        //respostaEsta.textContent = "Correta 😊"
        pontos += 10 // pontos = pontos + 10
    } else {
        //console.log("Errou!")
        //respostaEsta.textContent = "Errada 😢"
    }

    // atualizar placar
    placar = pontos
    instrucoes.textContent = "Pontos " + placar

    // bloquear a escolha de opcoes
    bloquearAlternativas()

    setTimeout(function() {
        //respostaEsta.textContent = '...'
        proxima = numeroDaQuestao+1

        if(proxima > totalDeQuestoes) {
            console.log('Fim do Jogo!')
            fimDoJogo()
        } else {
            proximaQuestao(proxima)
        }
    }, 250)
    desbloquearAlternativas()
}'  \z ,.'

function fimDoJogo() {
    instrucoes.textContent = "Fim de Jogo!"
    numQuestao.textContent = ""

    let pont = ''
    pontos == 0 ? pont = 'ponto' : pont = 'pontos'

    pergunta.textContent   = "Você conseguiu " + pontos + " " + pont

    aviso.textContent = "Você conseguiu " + pontos + " " + pont

    a.textContent = ""
    b.textContent = ""
    c.textContent = ""
   

    a.setAttribute('value', '0')
    b.setAttribute('value', '0')
    c.setAttribute('value', '0')
 

    // OCULTAR O ARTICLE DA QUESTAO
    articleQuestoes.style.display = 'none'

    setTimeout(function() {
        pontos = 0 // zerar placar
    }, 2000)
}

// Direcionar outra página de quiz 

