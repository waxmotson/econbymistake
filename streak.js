// Correct-answer streak tracking for ECONOMICS BY MISTAKE.
// Uses a new storage namespace so the streak can be reset independently.
// Also tracks how many questions were answered in the last 24 hours.

const STREAK_STORAGE_KEY = 'econbymistakeStreakV2';
const BEST_STREAK_STORAGE_KEY = 'econbymistakeBestStreakV2';
const QUESTIONS_24H_KEY = 'econbymistakeQuestions24hV1';

let correctStreak = Number(localStorage.getItem(STREAK_STORAGE_KEY)) || 0;
let bestCorrectStreak = Number(localStorage.getItem(BEST_STREAK_STORAGE_KEY)) || 0;

function getQuestionsInLast24h() {
  let timestamps = [];
  try {
    timestamps = JSON.parse(localStorage.getItem(QUESTIONS_24H_KEY) || '[]');
  } catch (e) {
    timestamps = [];
  }
  if (!Array.isArray(timestamps)) timestamps = [];

  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  timestamps = timestamps.filter(t => typeof t === 'number' && t > cutoff);
  localStorage.setItem(QUESTIONS_24H_KEY, JSON.stringify(timestamps));
  return timestamps.length;
}

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

  const questions24h = getQuestionsInLast24h();
  streak.textContent = `LAST 24H: ${questions24h} | CURRENT STREAK: ${correctStreak} | PB: ${bestCorrectStreak}`;
}

function recordAnswer(isCorrect) {
  // Track every answered question in the rolling 24h window
  let timestamps = [];
  try {
    timestamps = JSON.parse(localStorage.getItem(QUESTIONS_24H_KEY) || '[]');
  } catch (e) {
    timestamps = [];
  }
  if (!Array.isArray(timestamps)) timestamps = [];
  timestamps.push(Date.now());
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  timestamps = timestamps.filter(t => typeof t === 'number' && t > cutoff);
  localStorage.setItem(QUESTIONS_24H_KEY, JSON.stringify(timestamps));

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
