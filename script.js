let startTime = null;
let elapsed = 0;
let timerInterval = null;
let running = false;

const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisEl = document.getElementById('milliseconds');

const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function updateDisplay(time) {
  const hours = Math.floor(time / 3600000);
  const mins = Math.floor((time % 3600000) / 60000);
  const secs = Math.floor((time % 60000) / 1000);
  const millis = time % 1000;

  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(mins).padStart(2, '0');
  secondsEl.textContent = String(secs).padStart(2, '0');
  millisEl.textContent = String(millis).padStart(3, '0');
}

function startTimer() {
  startTime = Date.now() - elapsed;
  timerInterval = setInterval(() => {
    elapsed = Date.now() - startTime;
    updateDisplay(elapsed);
  }, 10);

  running = true;
  startPauseBtn.textContent = 'Pause';
  resetBtn.disabled = false;
  lapBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(timerInterval);
  running = false;
  startPauseBtn.textContent = 'Start';
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsed = 0;
  updateDisplay(0);
  laps.innerHTML = '';
  running = false;

  startPauseBtn.textContent = 'Start';
  resetBtn.disabled = true;
  lapBtn.disabled = true;
}

function addLap() {
  const li = document.createElement('li');
  const timeString = `${hoursEl.textContent}:${minutesEl.textContent}:${secondsEl.textContent}.${millisEl.textContent}`;
  li.textContent = timeString;
  laps.appendChild(li);
}

startPauseBtn.addEventListener('click', () => {
  running ? pauseTimer() : startTimer();
});

resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
