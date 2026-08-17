// Correct-answer streak tracking for ECONOMICS BY MISTAKE.
// This persists the current streak and best streak in localStorage.

let correctStreak = Number(localStorage.getItem('econbymistakeCorrectStreak')) || 0;
let bestCorrectStreak = Number(localStorage.getItem('econbymistakeBestCorrectStreak')) || 0;

function updateStreakDisplay() {
  let streak = document.getElementById('streak');
  if (!streak) {
    streak = document.createElement('div');
    streak.id = 'streak';
    streak.style.fontSize = '2.3rem';
    streak.style.fontWeight = 'bold';
    streak.style.marginTop = '12px';
    document.getElementById('result').insertAdjacentElement('afterend', streak);
  }

  streak.textContent = `CURRENT STREAK: ${correctStreak} | PB: ${bestCorrectStreak}`;
}

function recordAnswer(isCorrect) {
  if (isCorrect) {
    correctStreak++;
    if (correctStreak > bestCorrectStreak) {
      bestCorrectStreak = correctStreak;
      localStorage.setItem('econbymistakeBestCorrectStreak', bestCorrectStreak);
    }
  } else {
    correctStreak = 0;
  }

  localStorage.setItem('econbymistakeCorrectStreak', correctStreak);
  updateStreakDisplay();
}

document.addEventListener('DOMContentLoaded', updateStreakDisplay);
