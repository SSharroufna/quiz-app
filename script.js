//API URL: https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple

const _checkBtn = document.getElementById('check-answer');


function eventListeners(){
    document.getElementById('check-answer').addEventListener('click', checkAnswer);
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestions();
    eventListeners();
})

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
    <li>${index+1}. <span>${option} </span> </li>`).join('')}`;
    
    selectOption();
}

loadQuestions();

// document.querySelector('.quiz-options').innerHTML.querySelectorAll('li')
// .forEach((option)=>{
//     option.addeventListener('click', checkAnswer);
    

function selectOption(){
    document.querySelector('.quiz-options').querySelectorAll('li').forEach((option)=>{
        option.addEventListener('click', () => {
            if (document.querySelector('.quiz-options').querySelector('.selected')){
                const activeOption = document.querySelector('.quiz-options').querySelector('.selected');
                activeOption.classList.remove('.selected');
            }
            option.classList.add('.selected');
        })
    })
}

function checkAnswer(){
  
    document.querySelector('.quiz-options').disabled = true;
 
    if (document.querySelector('.quiz-options').querySelector('.selected')){
        console.log("selectedanswer");
        let selectedAnswer = document.querySelector('.quiz-options').querySelector('.selected span').textContent;
        if(selectedAnswer == correctAnswer){
            correctScore++;
            console.log('you got a point');
        }
    }


}


// function startQuiz {
//     currentQuestionIndex =0;
//     score = 0;
//     nextButton.innerHTML = "Next";
//     loadQuestions();
// }
