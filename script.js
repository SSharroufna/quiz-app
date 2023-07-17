//API URL: https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple


const _checkBtn = document.getElementById('check-answer');


function eventListeners(){
    _checkBtn.addeventListener('click',checkAnswer)
}




async function loadQuestions(){
    const APIUrl = 'https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple';
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    showQuestions(data.results[0]);
    console.log('hello');
    console.log('results');
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
    //selectOption();

}

// document.querySelector('.quiz-options').innerHTML.querySelectorAll('li')
// .forEach((option)=>{
//     option.addeventListener('click', checkAnswer);
    
    


function selectOption(){
    document.querySelector('.quiz-options').innerHTML.querySelectorAll('li')
    .forEach((option)=>{
        option.addeventListener('click', () => {
            if (document.querySelector('.quiz-options').querySelector('.selected')){
                const activeOption = document.querySelector('.quiz-options').querySelector('.selected');
                activeOption.classList.remove('.selected');
            }
            option.classList.add('.selected');
        })
    })
}

function checkAnswer(){
console.log('hello');
}


// function startQuiz {
//     currentQuestionIndex =0;
//     score = 0;
//     nextButton.innerHTML = "Next";
//     loadQuestions();
// }
