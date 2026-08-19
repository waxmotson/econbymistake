// Correct-answer streak tracking for ECONOMICS BY MISTAKE.
// Uses a new storage namespace so the streak can be reset independently.

const STREAK_STORAGE_KEY = 'econbymistakeStreakV2';
const BEST_STREAK_STORAGE_KEY = 'econbymistakeBestStreakV2';

let correctStreak = Number(localStorage.getItem(STREAK_STORAGE_KEY)) || 0;
let bestCorrectStreak = Number(localStorage.getItem(BEST_STREAK_STORAGE_KEY)) || 0;

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
      localStorage.setItem(BEST_STREAK_STORAGE_KEY, bestCorrectStreak);
    }
  } else {
    correctStreak = 0;
  }

  localStorage.setItem(STREAK_STORAGE_KEY, correctStreak);
  updateStreakDisplay();
}

document.addEventListener('DOMContentLoaded', updateStreakDisplay);
