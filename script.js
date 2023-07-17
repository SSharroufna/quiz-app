//https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple

const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');


async function loadQuestions(){
    const APIUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    showQuestions(data.results[0]);
}


function showQuestions(data){
    let correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random()*(incorrectAnswer.length + 1)),0 , correctAnswer);

    document.getElementById('question').innerHTML = `${data.question}`;
    const _options = document.querySelector('.quiz-options');

    document.querySelector('.quiz-options').innerHTML = `${optionsList.map((option,index) =>`
    <button>${index+1}. <span>${option} </span> </button>`).join('')}`
}

loadQuestions();