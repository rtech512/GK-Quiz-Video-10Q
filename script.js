let currentQuestion = 0;
let countdownInterval = null;
let timerRunning = false;
let quizStarted = false;
let justStarted = false;

function startQuiz() {
  document.getElementById("welcomePage").style.display = "none";
  document.getElementById("quizBox").style.display = "block";

  quizStarted = true;
  justStarted = true;

  setTimeout(() => {
    justStarted = false;
  }, 500);
}

function loadQuestion() {
  const q = questions[currentQuestion];

  document.getElementById("questionPage").style.display = "block";
  document.getElementById("answerPage").style.display = "none";

  document.querySelectorAll(".option").forEach((option) => {
    option.classList.remove("correct-answer");
    option.classList.remove("wrong-fade");
  });

  document.getElementById("count").innerText =
    `Question ${currentQuestion + 1}/${questions.length}`;

  document.getElementById("question").innerText =
    `${currentQuestion + 1}. ${q.question}`;

  document.getElementById("optionA").innerText = q.options[0];
  document.getElementById("optionB").innerText = q.options[1];
  document.getElementById("optionC").innerText = q.options[2];
  document.getElementById("optionD").innerText = q.options[3];

  document.getElementById("answer").innerText = q.answer;
  document.getElementById("explanation").innerText = q.explanation;
  document.getElementById("fact").innerText = q.fact;

  clearInterval(countdownInterval);
  timerRunning = false;

  document.getElementById("timerBox").style.display = "none";
  document.getElementById("timerBox").innerHTML = `<span id="timer"></span>`;
}

function showAnswer() {
  const q = questions[currentQuestion];

  document.getElementById("questionPage").style.display = "none";
  document.getElementById("answerPage").style.display = "block";

  document.getElementById("answer").innerText = q.answer;
  document.getElementById("explanation").innerText = q.explanation;
  document.getElementById("fact").innerText = q.fact;
}

function startCountdown() {
  if (!quizStarted) return;
  if (justStarted) return;
  if (timerRunning) return;

  timerRunning = true;
  let timeLeft = 5;

  const timerBox = document.getElementById("timerBox");
  timerBox.style.display = "block";
  timerBox.innerHTML = `<span id="timer">${timeLeft}</span>`;

  countdownInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      timerRunning = false;
      timerBox.style.display = "none";
      showAnswer();
    }
  }, 1000);
}

function nextQuestion() {
  if (!quizStarted) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    document.getElementById("questionPage").style.display = "none";
    document.getElementById("answerPage").style.display = "none";
    document.querySelector(".controls").style.display = "none";

    const endPage = document.getElementById("endPage");

    endPage.style.display = "flex";
    endPage.style.position = "fixed";
    endPage.style.top = "0";
    endPage.style.left = "0";
    endPage.style.width = "100vw";
    endPage.style.height = "100vh";
    endPage.style.zIndex = "999";
    endPage.style.background = "rgba(17, 24, 39, 0.96)";
  }
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault();

    if (!quizStarted) {
      startQuiz();
      return;
    }

    startCountdown();
  }

  if (event.code === "ArrowRight" && quizStarted) {
    nextQuestion();
  }
});

loadQuestion();
createParticles();

function createParticles() {
  const particleContainer = document.getElementById("particles");
  if (!particleContainer) return;

  particleContainer.innerHTML = "";

  for (let i = 0; i < 45; i++) {
    const particle = document.createElement("span");
    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "%";

    const size = Math.random() * 4 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.animationDuration = Math.random() * 12 + 8 + "s";
    particle.style.animationDelay = Math.random() * -20 + "s";

    particleContainer.appendChild(particle);
  }
}