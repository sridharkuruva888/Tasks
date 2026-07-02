const quizData = [
  {
    question: "Who is known as the 'God of Cricket'?",
    options: [
      "Virat Kohli",
      "Sachin Tendulkar",
      "MS Dhoni",
      "Rohit Sharma"
    ],
    answer: "Sachin Tendulkar"
  },

  {
    question: "How many players are there in a cricket team?",
    options: [
      "9",
      "10",
      "11",
      "12"
    ],
    answer: "11"
  },

  {
    question: "Which country won the Cricket World Cup in 2019?",
    options: [
      "India",
      "Australia",
      "England",
      "New Zealand"
    ],
    answer: "England"
  },

  {
    question: "Who is known as 'Captain Cool' in cricket?",
    options: [
      "Virat Kohli",
      "MS Dhoni",
      "Rohit Sharma",
      "Sourav Ganguly"
    ],
    answer: "MS Dhoni"
  },

  {
    question: "Which player has scored the most international centuries?",
    options: [
      "Virat Kohli",
      "Ricky Ponting",
      "Sachin Tendulkar",
      "Jacques Kallis"
    ],
    answer: "Sachin Tendulkar"
  },

  {
    question: "What is the maximum number of overs per side in a T20 match?",
    options: [
      "10",
      "20",
      "40",
      "50"
    ],
    answer: "20"
  },

  {
    question: "Which country has won the most ICC Cricket World Cups?",
    options: [
      "India",
      "England",
      "Australia",
      "West Indies"
    ],
    answer: "Australia"
  },

  {
    question: "Who is called the 'Hitman' of Indian Cricket?",
    options: [
      "Virat Kohli",
      "KL Rahul",
      "Rohit Sharma",
      "Shubman Gill"
    ],
    answer: "Rohit Sharma"
  },

  {
    question: "What is the term used when a bowler takes three wickets in three consecutive balls?",
    options: [
      "Triple",
      "Hat-trick",
      "Century",
      "Maiden"
    ],
    answer: "Hat-trick"
  },

  {
    question: "Which Indian cricketer is popularly known as the 'King Kohli'?",
    options: [
      "Rohit Sharma",
      "Virat Kohli",
      "Hardik Pandya",
      "Shikhar Dhawan"
    ],
    answer: "Virat Kohli"
  }
];

let currentQuestion = 0;
let userAnswers = new Array(quizData.length).fill(null);

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");

const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const progressEl = document.getElementById("progress");


startBtn.addEventListener("click", () => {
  welcomeScreen.classList.remove("active");
  quizScreen.classList.add("active");
  loadQuestion();
});


function loadQuestion() {

  const current = quizData[currentQuestion];

  progressEl.textContent =
    `Question ${currentQuestion + 1} of ${quizData.length}`;

  questionEl.textContent = current.question;

  optionsContainer.innerHTML = "";

  current.options.forEach(option => {

    const div = document.createElement("div");
    div.classList.add("option");
    div.textContent = option;

    if (userAnswers[currentQuestion] === option) {
      div.classList.add("selected");
    }

    div.addEventListener("click", () => {

      userAnswers[currentQuestion] = option;

      document.querySelectorAll(".option")
        .forEach(opt => opt.classList.remove("selected"));

      div.classList.add("selected");
    });

    optionsContainer.appendChild(div);
  });

  prevBtn.disabled = currentQuestion === 0;

  if (currentQuestion === quizData.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "block";
  } else {
    nextBtn.style.display = "block";
    submitBtn.style.display = "none";
  }
}


nextBtn.addEventListener("click", () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
});


prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});


submitBtn.addEventListener("click", showResults);

function showResults() {

  let score = 0;

  quizData.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });

  const wrong = quizData.length - score;
  const percentage = ((score / quizData.length) * 100).toFixed(2);

  document.getElementById("score").textContent =
    `Score: ${score}/${quizData.length}`;

  document.getElementById("correct").textContent =
    `Correct Answers: ${score}`;

  document.getElementById("wrong").textContent =
    `Wrong Answers: ${wrong}`;

  document.getElementById("percentage").textContent =
    `Percentage: ${percentage}%`;

  let message = "";

  if (percentage >= 90) {
    message = "Excellent! 🌟";
  } else if (percentage >= 75) {
    message = "Great Job! 👍";
  } else if (percentage >= 50) {
    message = "Good Effort! 😊";
  } else {
    message = "Keep Practicing! 📚";
  }

  document.getElementById("performance").textContent = message;

  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
}


restartBtn.addEventListener("click", () => {

  currentQuestion = 0;
  userAnswers = new Array(quizData.length).fill(null);

  resultScreen.classList.remove("active");
  welcomeScreen.classList.add("active");
});