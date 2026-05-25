const quizQuestions = [
  {
    question: 'You receive an email claiming to be from your bank and asking you to login immediately. What is the safest action?',
    options: [
      'Click the link and login now',
      'Reply with your account details',
      'Visit the bank website directly in a new browser tab',
      'Download the attached document to verify the request'
    ],
    answer: 2,
    feedback: 'Correct! Always access the service directly rather than clicking a suspicious link.'
  },
  {
    question: 'A coworker sends a file unexpectedly. What should you do?',
    options: [
      'Open it right away to avoid delays',
      'Confirm the file request with the sender before opening it',
      'Forward it to your manager without opening it',
      'Ignore it if it looks urgent'
    ],
    answer: 1,
    feedback: 'Great choice. Verifying unexpected files helps prevent malware and spoofing attacks.'
  },
  {
    question: 'Which of these is the most secure password strategy?',
    options: [
      'Reuse a strong password across multiple sites',
      'Use a single short password with special characters',
      'Create a long, unique passphrase and use a password manager',
      'Write passwords on paper so you never forget them'
    ],
    answer: 2,
    feedback: 'That is right. Unique passphrases and a password manager reduce the risk of credential reuse.'
  }
];

const quizQuestion = document.getElementById('quiz-question');
const quizOptions = document.getElementById('quiz-options');
const quizProgress = document.getElementById('quiz-progress');
const quizScore = document.getElementById('quiz-score');
const quizNext = document.getElementById('quiz-next');
const quizResult = document.getElementById('quiz-result');

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

function renderQuiz() {
  const current = quizQuestions[currentQuestion];
  quizQuestion.textContent = current.question;
  quizOptions.innerHTML = '';
  current.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quiz-option';
    button.textContent = option;
    button.dataset.index = index;
    button.addEventListener('click', () => selectOption(button));
    quizOptions.appendChild(button);
  });

  quizProgress.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
  quizResult.classList.add('visually-hidden');
  quizResult.textContent = '';
  selectedOption = null;
  quizNext.textContent = 'Submit Answer';
}

function selectOption(button) {
  document.querySelectorAll('.quiz-option').forEach((option) => option.classList.remove('active'));
  button.classList.add('active');
  selectedOption = Number(button.dataset.index);
}

function finishQuiz() {
  quizQuestion.textContent = 'Quiz complete!';
  quizOptions.innerHTML = '';
  quizProgress.textContent = `Final score: ${score} / ${quizQuestions.length}`;
  quizResult.classList.remove('visually-hidden');
  const summary = score === quizQuestions.length
    ? 'Excellent work! You understand the fundamentals of strong cyber hygiene.'
    : 'Nice work! Review the tips and try again to improve your score.';
  quizResult.textContent = summary;
  quizNext.textContent = 'Restart Quiz';
}

quizNext.addEventListener('click', () => {
  if (currentQuestion >= quizQuestions.length) {
    currentQuestion = 0;
    score = 0;
    quizScore.textContent = score;
    renderQuiz();
    return;
  }

  if (selectedOption === null) {
    quizResult.classList.remove('visually-hidden');
    quizResult.textContent = 'Please choose an answer before continuing.';
    return;
  }

  const current = quizQuestions[currentQuestion];
  const isCorrect = selectedOption === current.answer;
  if (isCorrect) {
    score += 1;
    quizResult.textContent = current.feedback;
    quizResult.style.color = 'var(--success)';
  } else {
    quizResult.textContent = `Not quite. ${current.feedback}`;
    quizResult.style.color = 'var(--warning)';
  }

  quizResult.classList.remove('visually-hidden');
  quizScore.textContent = score;
  quizNext.textContent = currentQuestion === quizQuestions.length - 1 ? 'See Results' : 'Next Question';

  if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion += 1;
    selectedOption = null;
    setTimeout(renderQuiz, 1400);
  } else {
    currentQuestion += 1;
    setTimeout(finishQuiz, 1400);
  }
});

const checklistItems = document.querySelectorAll('.check-item input');
const checklistSummary = document.getElementById('check-summary');

function updateChecklist() {
  const completed = Array.from(checklistItems).filter((input) => input.checked).length;
  checklistSummary.textContent = `${completed} of ${checklistItems.length} habits completed`;
}

checklistItems.forEach((checkbox) => checkbox.addEventListener('change', updateChecklist));
updateChecklist();

const faqButtons = document.querySelectorAll('.faq-item button');
faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    item.classList.toggle('expanded', !isOpen);
  });
});

renderQuiz();
