// Designed by Eliezer Ladeira - 10/02/2021

// inicial data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// functions
function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];
        
        // Math.floor = arredondamento para baixo
        let pct = Math.floor((currentQuestion / questions.length) * 100);

        // atualiza a barra de progresso
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        // esconde a área de score e exibe a área de questões
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        // exibe a pergunta
        document.querySelector('.question').innerHTML = q.question;

        // exibe as alternativas
        /* para diminuir processamento DOM, é indicado alterar o documento o mínimo de vezes
           assim, em vez de fazer um for para ir lendo as alternativas e preenchendo na tela com innerHTM,
           faz-se o for mas preenche uma variável e depois altera uma única vez o documento com o valor da variável,
           onde já existirão todos os valores */
        let optionsHtml = '';
        
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`;
        }
        
        document.querySelector('.options').innerHTML = optionsHtml;

        // adiciona evento aos itens dinâmicos das alternativas
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })

    } else {
        // acabaram as questões
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if (questions[currentQuestion].answer === clickedOption) {
        // acertou
        correctAnswers++;
    }

    // passa para a próxima pergunta, independente se acertou ou não
    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim heim!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

    // esconde área de questões e mostra área de resultado
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
 
    // atualiza a barra de progresso
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}