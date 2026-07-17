let currentQuestion = 0;
let countdownInterval = null;
let timerRunning = false;
let quizStarted = false;
let justStarted = false;

/* =========================
   START QUIZ
========================= */

function startQuiz() {
  const welcomePage = document.getElementById("welcomePage");
  const quizBox = document.getElementById("quizBox");
  const endPage = document.getElementById("endPage");

  if (welcomePage) welcomePage.style.display = "none";
  if (quizBox) quizBox.style.display = "block";
  if (endPage) endPage.style.display = "none";

  currentQuestion = 0;
  quizStarted = true;
  justStarted = true;

  loadQuestion();

  setTimeout(() => {
    justStarted = false;
  }, 500);
}

/* =========================
   LOAD QUESTION
========================= */

function loadQuestion() {
  const q = questions[currentQuestion];

  const questionPage = document.getElementById("questionPage");
  const answerPage = document.getElementById("answerPage");
  const timerBox = document.getElementById("timerBox");
  const controls = document.querySelector(".controls");

  questionPage.style.display = "block";
  answerPage.style.display = "none";
  controls.style.display = "flex";

  document.querySelectorAll(".option").forEach((option) => {
    option.classList.remove("correct-answer", "wrong-fade");
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

  countdownInterval = null;
  timerRunning = false;

  timerBox.style.display = "none";
  timerBox.innerHTML = `<span id="timer"></span>`;
}

/* =========================
   SHOW ANSWER
========================= */

function showAnswer() {
  const q = questions[currentQuestion];

  clearInterval(countdownInterval);

  countdownInterval = null;
  timerRunning = false;

  document.getElementById("timerBox").style.display = "none";
  document.getElementById("questionPage").style.display = "none";
  document.getElementById("answerPage").style.display = "block";

  document.getElementById("answer").innerText = q.answer;
  document.getElementById("explanation").innerText = q.explanation;
  document.getElementById("fact").innerText = q.fact;
}

/* =========================
   COUNTDOWN TIMER
========================= */

function startCountdown() {
  if (!quizStarted || justStarted || timerRunning) return;

  timerRunning = true;

  let timeLeft = 5;

  const timerBox = document.getElementById("timerBox");

  timerBox.style.display = "block";
  timerBox.innerHTML = `<span id="timer">${timeLeft}</span>`;

  countdownInterval = setInterval(() => {
    timeLeft--;

    const timer = document.getElementById("timer");

    if (timer) {
      timer.innerText = timeLeft;
    }

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);

      countdownInterval = null;
      timerRunning = false;

      timerBox.style.display = "none";

      showAnswer();
    }
  }, 1000);
}

/* =========================
   NEXT QUESTION
========================= */

function nextQuestion() {
  if (!quizStarted) return;

  clearInterval(countdownInterval);

  countdownInterval = null;
  timerRunning = false;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
    return;
  }
function launchConfetti() {
  const container =
    document.getElementById("confettiContainer");

  if (!container) return;

  container.innerHTML = "";

  const colors = [
    "#facc15",
    "#22c55e",
    "#38bdf8",
    "#ec4899",
    "#a855f7",
    "#fb923c"
  ];

  for (let i = 0; i < 85; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";

    piece.style.left = `${Math.random() * 100}%`;

    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.animationDuration =
      `${Math.random() * 3 + 3}s`;

    piece.style.animationDelay =
      `${Math.random() * 1.8}s`;

    piece.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    container.appendChild(piece);
  }
}
  showEndPage();
}

/* =========================
   END PAGE
========================= */

function showEndPage() {
  document.getElementById("questionPage").style.display = "none";
  document.getElementById("answerPage").style.display = "none";
  document.getElementById("timerBox").style.display = "none";

  const controls = document.querySelector(".controls");

  if (controls) {
    controls.style.display = "none";
  }

  const endPage = document.getElementById("endPage");

  endPage.style.display = "flex";
  endPage.style.position = "fixed";
  endPage.style.inset = "0";
  endPage.style.width = "100vw";
  endPage.style.height = "100vh";
  endPage.style.zIndex = "999";
  endPage.style.background = "rgba(17, 24, 39, 0.94)";
  launchConfetti();
}

/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener("keydown", (event) => {
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

/* =========================
   MOVING PARTICLES
========================= */

function createParticles() {
  const particleContainer = document.getElementById("particles");

  if (!particleContainer) {
    console.error("Particles container nahi mila.");
    return;
  }

  particleContainer.innerHTML = "";

  for (let i = 0; i < 65; i++) {
    const particle = document.createElement("span");

    particle.className = "particle";

    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 14 + 9;
    const delay = Math.random() * -20;

    particle.style.left = Math.random() * 100 + "%";
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    particleContainer.appendChild(particle);
  }
}

/* =========================
   INITIALIZE
========================= */

document.addEventListener("DOMContentLoaded", () => {
  loadQuestion();
  createParticles();
});