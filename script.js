// ===== VOICE NAVIGATION (HOVER ENABLED) =====

if ('speechSynthesis' in window) {

  const synth = window.speechSynthesis;
  let unlocked = false;

  function speak(text) {
    if (!unlocked) return; // block until user clicks once

    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.9;
    utter.lang = "en-US";
    synth.speak(utter);
  }

  // 🔓 UNLOCK SPEECH (1st click anywhere)
  document.body.addEventListener('click', () => {
    unlocked = true;
  }, { once: true });

  // ===== DOTS (HOVER) =====
  document.querySelectorAll('.circular-card').forEach(dot => {

    dot.addEventListener('mouseenter', () => {
      speak(dot.getAttribute('aria-label'));
    });

    dot.addEventListener('focus', () => {
      speak(dot.getAttribute('aria-label'));
    });

  });

  // ===== BUTTONS (HOVER) =====
  document.getElementById('reset-dots')?.addEventListener('mouseenter', () => {
    speak("Reset dots");
  });

  document.getElementById('id-alpha')?.addEventListener('mouseenter', () => {
    speak("Identify alphabet");
  });

}

// ===== BRAILLE DOT INTERACTION =====
const circularCards = document.querySelectorAll('.circular-card');
const outputElement = document.getElementById('output');

// Braille to Alphabet mapping (dot indices: 0-top left, 1-top right, 2-mid left, 3-mid right, 4-bottom left, 5-bottom right)
const brailleMap = {
  '0': { symbol: 'A', text: 'This is alphabet A' },
  '0,2': { symbol: 'B', text: 'This is alphabet B' },
  '0,1': { symbol: 'C', text: 'This is alphabet C' },
  '0,3,4': { symbol: 'D', text: 'This is alphabet D' },
  '0,3': { symbol: 'E', text: 'This is alphabet E' },
  '0,2,3': { symbol: 'F', text: 'This is alphabet F' },
  '0,1,2,3': { symbol: 'G', text: 'This is alphabet G' },
  '0,2,4': { symbol: 'H', text: 'This is alphabet H' },
  '2,3': { symbol: 'I', text: 'This is letter I' },
  '2,3,4': { symbol: 'J', text: 'This is alphabet J' },
  '0,5': { symbol: 'K', text: 'This is alphabet K' },
  '0,2,5': { symbol: 'L', text: 'This is alphabet L' },
  '0,3,5': { symbol: 'M', text: 'This is letter M' },
  '0,3,4,5': { symbol: 'N', text: 'This is letter N' },
  '0,4,5': { symbol: 'O', text: 'This is letter O' },
  '0,1,2,4': { symbol: 'P', text: 'This is letter P' },
  '0,1,2,3,4': { symbol: 'Q', text: 'This is alphabet Q' },
  '0,2,3,4': { symbol: 'R', text: 'This is letter R' },
  '1,2,4': { symbol: 'S', text: 'This is letter S' },
  '1,2,3,4': { symbol: 'T', text: 'This is alphabet T' },
  '0,4,5': { symbol: 'U', text: 'This is alphabet U' },
  '0,2,4,5': { symbol: 'V', text: 'This is alphabet V' },
  '1,2,3,5': { symbol: 'W', text: 'This is alphabet W' },
  '0,1,4,5': { symbol: 'X', text: 'This is alphabet X' },
  '0,1,3,4,5': { symbol: 'Y', text: 'This is letter Y' },
  '0,3,4,5': { symbol: 'Z', text: 'This is alphabet Z' }
};

// Add click event listeners to dots
circularCards.forEach((card, index) => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    card.classList.toggle('active');
    identifyAlphabet();
  });

  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('active');
      identifyAlphabet();
    }
  });
});

// Function to identify alphabet from selected dots
function identifyAlphabet() {
  const activeIndices = Array.from(circularCards)
    .map((card, index) => card.classList.contains('active') ? index : null)
    .filter(i => i !== null)
    .sort((a, b) => a - b);

  if (activeIndices.length === 0) {
    outputElement.textContent = 'Click dots to start...';
    return;
  }

  const key = activeIndices.join(',');
  
  if (brailleMap[key]) {
    const result = brailleMap[key];
    outputElement.textContent = result.text;
    
    // Speak the result
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(result.text);
      window.speechSynthesis.speak(utterance);
    }
  } else {
    outputElement.textContent = 'Pattern not recognized. Try another combination.';
  }
}

// Identify Alphabet button
const idAlphaBtn = document.getElementById('id-alpha');
if (idAlphaBtn) {
  idAlphaBtn.addEventListener('click', identifyAlphabet);
}

// Reset button
const resetBtn = document.getElementById('reset-dots');
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    circularCards.forEach(card => {
      card.classList.remove('active');
    });
    outputElement.textContent = 'Click dots to start...';
  });
}

// Set copyright year
document.getElementById('year').textContent = new Date().getFullYear();