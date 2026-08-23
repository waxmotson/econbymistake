const clickSound = new Audio('vine2.mp3');
let answered = false;


const correct = ["Are you Jim Chalmers?", "That was an easy one.", "Lucky guess.", "Someone's been studying.", "Ceteris paribus.", "BOOM vs trough"]

const incorrect = ["Someone needs to study.", "Misclick?", "Putting the mistake in ECONOMICS BY MISTAKE", "You are a negative externality", "You are a demerit good", "Your intelligence is in a contractionary phase", "Thinking deficit", "boom vs TROUGH", "bum"]

let current = null;

// Map filename prefixes to subfolders (images uploaded into static/crops_*/)
function resolveImagePath(filename) {
  const map = {
    'PLM_ABB_2021-': 'crops_abb2021/',
    'PLM_JR_2021-':  'crops_jr2021/',
    'PLM_KNOX_2020-': 'crops_knox2020/',
    'PLM_KNOX_2021-': 'crops_knox2021/',
    'PLM_KNOX_2025-': 'crops_knox2025/',
    'PLM_RIV_2024-':  'crops_riv2024/',
    'PLM_SG_2021-':   'crops_sg2021/',
  };
  for (const [prefix, folder] of Object.entries(map)) {
    if (filename.startsWith(prefix)) {
      return 'static/' + folder + filename;
    }
  }
  // Default: image is directly in static/
  return 'static/' + filename;
}

function loadRandom() {
  answered = false;

  document.querySelectorAll('.buttons button').forEach(btn => {
      btn.disabled = false;
  });

  // Prefer questions not answered in the last 24 hours (see streak.js)
  current = (typeof pickQuestion === 'function')
    ? pickQuestion(answers)
    : answers[Math.floor(Math.random() * answers.length)];

  document.getElementById('title').textContent = current.question;
  document.getElementById('question-img').src = resolveImagePath(current.question);
  document.getElementById('result').textContent = '';
}

function check(choice) {

    if (answered) return;
    answered = true;

    document.querySelectorAll('.buttons button').forEach(btn => {
        btn.disabled = true;
    });


    
  
    clickSound.currentTime = 0;   // rewind so it can play repeatedly
    clickSound.play();
    document.getElementById("reloader").hidden = false;

  
    // Accept single letter or any letter that appears in multi-letter answers (e.g. "BC")
    if (current.answer.includes(choice)) {
        recordAnswer(true, current.question);
        document.getElementById('result').textContent = 
        'CORRECT ANSWER: ' + current.answer; 
        document.getElementById('message').textContent=
        correct[Math.floor(Math.random()*correct.length)];
        document.getElementById('result').style.color = 'lawngreen';
    } else {
        recordAnswer(false, current.question);
        document.getElementById('result').textContent = 
        'Incorrect, it was: ' + current.answer;
        document.getElementById('message').textContent=
        incorrect[Math.floor(Math.random()*incorrect.length)];
        document.getElementById('result').style.color = 'firebrick';
    }



    
}

loadRandom();
