const quizData = [
    {
      question: "Which country hosted the 2016 Summer Olympics?",
      options: ["Brazil", "China", "Russia", "US"],
      correctAnswer: "Brazil",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      question: "Who was the first woman to win a Nobel Prize?",
      options: ["Marie Curie", "Amelia Earhart", "Rosa Parks", "Mother Teresa"],
      correctAnswer: "Marie Curie",
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic"],
      correctAnswer: "Mitochondria",
    },
    {
      question: "What is the currency of Japan?",
      options: ["Yuan", "Yen", "Won", "Ringgit"],
      correctAnswer: "Yen",
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timer;
  let selectedAnswer = "";
  let isCorrectAnswer = true;
  

function loadQuestion() {
    resetTimer();
  
    // this line will display the timer on question load
    document.getElementById("timer").style.display = "block";
  
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
  
    const currentQuizData = quizData[currentQuestion];
  
    questionElement.textContent = currentQuizData.question;
    optionsElement.innerHTML = "";
  
    currentQuizData.options.forEach((option, index) => {
      const li = document.createElement("li");
      li.textContent = option;
      li.addEventListener("click", () => beforeCheckAnswer(option,li));  // After clicking on any option beforeCheckAnswer function will be called
      optionsElement.appendChild(li);
    });
  
    startTimer();
  }

  function beforeCheckAnswer(option,li){
    selectedAnswer = option;

    const options = document.querySelectorAll("#options li");

    options.forEach((option) => {
        option.classList.remove("selectedoption");
    });

    li.classList.add("selectedoption");

  }

  // After clicking on submit button this line will be executed
  document.getElementById('submit-btn').addEventListener("click",() => checkAnswer(selectedAnswer));
  
  function updateTimerDisplay(timeLeft) {
    document.getElementById("timer-display").textContent = timeLeft;
  }
  
  function startTimer() {
    let timeLeft = 30;
    updateTimerDisplay(timeLeft);
  
    timer = setInterval(() => {
      timeLeft--;
  
      updateTimerDisplay(timeLeft);
  
      if (timeLeft <= 0) {
        isCorrectAnswer = false;
        stopTimer();
        showResult();
      }
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(timer);
    document.getElementById("timer").style.display = "none";
  }
  
  function resetTimer() {
    stopTimer();
  }

  
  
  function checkAnswer(selectedAnswer) {
    const currentQuizData = quizData[currentQuestion];
  
    if (selectedAnswer === currentQuizData.correctAnswer) {
      score++;
      isCorrectAnswer = true;
    }
    else{
        isCorrectAnswer = false;
    }
  
    showResult();
  }
  
  function showResult() {
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result-container");
    const resultElement = document.getElementById("result");
    const submitButton = document.getElementById('submit-btn');
    const timerElement = document.getElementById("timer");
  
    questionContainer.style.display = "none";
    resultContainer.style.display = "block";
    submitButton.style.display = "none";
    timerElement.style.display = "none";
  
    resultElement.textContent = `Your answer is ${
      isCorrectAnswer ? "correct" : "incorrect"
    }!`;
  
    if (currentQuestion < quizData.length - 1) {
      document.getElementById("next-btn").style.display = "block";
    } else {
      document.getElementById("next-btn").style.display = "none";
      showFinalScore();
    }
  }
  
  function showFinalScore() {
    const modal = document.getElementById("score-modal");
    const finalScoreElement = document.getElementById("final-score");
  
    finalScoreElement.textContent = score;
    modal.style.display = "block";
  }
  
  function nextQuestion() {
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result-container");
    const submitButton = document.getElementById("submit-btn");
    const timerElement = document.getElementById('timer');
  
    questionContainer.style.display = "block";
    resultContainer.style.display = "none";
    submitButton.style.display = "block";
    timerElement.style.display = "block";
  
    currentQuestion++;
  
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showFinalScore();
    }
  }
  
  function closeModal() {
    const modal = document.getElementById("score-modal");
    modal.style.display = "none";
  }
  
  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
  
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result-container");
    const submitButton = document.getElementById("submit-btn");
  
    questionContainer.style.display = "block";
    resultContainer.style.display = "none";
    submitButton.style.display = "block"
  
    loadQuestion();
    closeModal();
  }
  
  window.onload = loadQuestion;
  