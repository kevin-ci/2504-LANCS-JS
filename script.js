let userAnswered = false;
let currentQuestion = 0;
let score = 0;

const answerButtons = document.getElementsByClassName("answer");
const nextButtonElement = document.getElementById("next");
const feedbackDiv = document.getElementById("feedback");
const quizContentElement = document.getElementById("quiz-content");

nextButtonElement.classList.add("hidden");

questions = shuffle(questions);
for (let question of questions) {
    question.options = shuffle(question.options);
}


function displayQuestion(idx) {
    const questionTextElement = document.getElementById("question");
    questionTextElement.innerText = questions[idx].text;

    for (let i = 0; i < answerButtons.length; i++) {
        let text = questions[idx].options[i][0];
        answerButtons[i].innerText = text;
        answerButtons[i].dataset.correct = questions[idx].options[i][1];
    }
}

displayQuestion(currentQuestion);

for (let button of answerButtons) {
    button.addEventListener("click", function () {
        if (!userAnswered) {
            if (button.dataset.correct === "true") {
                feedbackDiv.innerText = "Correct!";
                score++;
            } else {
                feedbackDiv.innerText = "Wrong!";
            }
            userAnswered = true;
            nextButtonElement.classList.remove("hidden");
        }
    });
}

nextButtonElement.addEventListener("click", function () {
    if (currentQuestion === questions.length - 1) {
        quizContentElement.innerHTML = `
            <h2>Game over!</h2>
            <h3>Your score: ${score} / ${questions.length}</h3>
        `;
    } 
    else {
        currentQuestion++;
        displayQuestion(currentQuestion);
        userAnswered = false;
        feedbackDiv.innerText = "";
        nextButtonElement.classList.add("hidden");
    }
});

function shuffle(array) {
  let oldElement;
  for (let i = array.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    oldElement = array[i];
    array[i] = array[rand];
    array[rand] = oldElement;
  }
  return array;
}