//API URL: https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
const _options = document.querySelector('.quiz-options');
const _question = document.getElementById('question');
const _playAgain = document.getElementById('playAgain-btn');
const _checkBtn = document.getElementById('check-answer');

const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');

let correctAnswer; let correctScore = askedCount = 0, totalQuestion = 10;

const _result = document.getElementById('result');

//Event listeners
function eventListeners(){
    _checkBtn.addEventListener('click', checkAnswer);
    _playAgain.addEventListener('click', restartQuiz());
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestions();
    eventListeners();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
});


//Display Optiosn and questions function 
async function loadQuestions(){
    const APIUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();

    _result.innerHTML = " ";
    showQuestions(data.results[0]);
}

function showQuestions(data){ 
    _checkBtn.disabled = false;  
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;

    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random()*(incorrectAnswer.length + 1)),0 , correctAnswer);

    _question.innerHTML = `${data.question}`;

    _options.innerHTML = `${optionsList.map((option,index) =>`
    <li>${index+1}. <span>${option}</span> </li>`).join('')}`;
    
    console.log(correctAnswer); 
    
    selectOption();
}

// document.querySelector('.quiz-options').innerHTML.querySelectorAll('li')
// .forEach((option)=>{
//     option.addeventListener('click', checkAnswer);

function selectOption(){
    _options.querySelectorAll('li').forEach((option)=>{
        option.addEventListener('click', () => {
            if (_options.querySelector('.selected')){
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

function checkAnswer(){
  
    _checkBtn.disabled = true;
 
    if (_options.querySelector('.selected')){
        
        let selectedAnswer = _options.querySelector('.selected span').textContent;

        if(selectedAnswer.trim() == HTMLDecode(correctAnswer)){ 
            correctScore++;
            _result.innerHTML = `<p> <i class = "fas fa-check"></i> Correct Answer! </p>`;
        } else { 
            _result.innerHTML = `<p> <i class = "fas fa-times"></i> incorrect Answer! <p> </p> <small><b> Correct Answer: </b> ${correctAnswer} </small></p>`;
        }
        checkCount();
    } else {
        _result.innerHTML = "please choose an option!";
        _checkBtn.disabled = false;
    }
}

function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

function checkCount(){
    askedCount++;
    setCount();
    if (askedCount == totalQuestion){
        _result.innerHTML = `<p> your score is ${correctScore}. <\p>` 
        _playAgain.style.display = "block";
        _checkBtn.style.display = "none";

    } else {
        setTimeout(() => {
            loadQuestions(); 
        }, 2000);
    }
}

function setCount(){
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}

function restartQuiz(){
    correctScore = askedCount = 0;
    _playAgain.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    setCount();
    loadQuestions();
}
