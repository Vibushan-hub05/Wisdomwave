let timer;
let isRunning = false;
let currentTime;
let isWork = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const statusDisplay = document.getElementById('status');
const sessionLengthInput = document.getElementById('sessionLength');
const breakLengthInput = document.getElementById('breakLength');
const settingsBox = document.getElementById('settingsBox');

function updateDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            currentTime--;
            if (currentTime < 0) {
                clearInterval(timer);
                isRunning = false;
                if (isWork) {
                    currentTime = parseInt(breakLengthInput.value) * 60;
                    statusDisplay.textContent = 'Break';
                } else {
                    currentTime = parseInt(sessionLengthInput.value) * 60;
                    statusDisplay.textContent = 'Work';
                }
                isWork = !isWork;
                startTimer();
            }
            updateDisplay();
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    currentTime = parseInt(sessionLengthInput.value) * 60;
    isWork = true;
    statusDisplay.textContent = 'Work';
    updateDisplay();
}

function showSettings() {
    settingsBox.style.display = 'block';
}

function hideSettings() {
    settingsBox.style.display = 'none';
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('settings').addEventListener('click', showSettings);
document.getElementById('closeSettings').addEventListener('click', hideSettings);

document.getElementById('shortBreak').addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    currentTime = 5 * 60;
    statusDisplay.textContent = 'Break';
    updateDisplay();
});

document.getElementById('longBreak').addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    currentTime = 10 * 60;
    statusDisplay.textContent = 'Break';
    updateDisplay();
});

resetTimer(); 
