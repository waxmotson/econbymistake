const clickSound = new Audio('vine2.mp3');
let answered = false;


const correct = ["Are you Jim Chalmers?", "That was an easy one.", "Lucky guess.", "Someone's been studying.", "Ceteris paribus.", "BOOM vs trough"]

const incorrect = ["Someone needs to study.", "Misclick?", "Putting the mistake in ECONOMICS BY MISTAKE", "You are a negative externality", "You are a demerit good", "Your intelligence is in a contractionary phase", "Thinking deficit", "boom vs TROUGH", "bum"]

let current = null;

function loadRandom() {
  answered = false;

  document.querySelectorAll('.buttons button').forEach(btn => {
      btn.disabled = false;
  });

  
  current = answers[Math.floor(Math.random() * answers.length)];
  document.getElementById('title').textContent = current.question;
  document.getElementById('question-img').src = 'static/' + current.question;
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

  
    if (choice == current.answer) {
        recordAnswer(true);
        document.getElementById('result').textContent = 
        'CORRECT ANSWER: ' + current.answer; 
        document.getElementById('message').textContent=
        correct[Math.floor(Math.random()*correct.length)];
        document.getElementById('result').style.color = 'lawngreen';
    } else {
        recordAnswer(false);
        document.getElementById('result').textContent = 
        'Incorrect, it was: ' + current.answer;
        document.getElementById('message').textContent=
        incorrect[Math.floor(Math.random()*incorrect.length)];
        document.getElementById('result').style.color = 'firebrick';
    }



    
}

loadRandom();
