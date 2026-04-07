let currentIndex = 0;
let currentData = [...vocabData]; // Creates a copy of your data array

// Function to load a card onto the screen
function loadCard(index) {
  const wordObj = currentData[index];
  
  // Update Counters & Headers
  document.getElementById('card-counter').innerText = `${index + 1} of ${currentData.length}`;
  document.getElementById('bottom-counter').innerText = `${index + 1} / ${currentData.length}`;
  document.getElementById('card-topic').innerText = wordObj.topic;
  
  // Update Word
  document.getElementById('word-display').innerText = wordObj.word;

  // Reset the toggle boxes back to default text
  document.getElementById('box-pos').innerHTML = 'PART OF SPEECH';
  document.getElementById('box-def').innerHTML = 'DEFINITION';
  document.getElementById('box-sen').innerHTML = 'SENTENCE';
}

// Function to reveal text when a box is clicked
function reveal(type) {
  const wordObj = currentData[currentIndex];
  
  if (type === 'pos') {
    document.getElementById('box-pos').innerHTML = `<strong>${wordObj.partOfSpeech}</strong>`;
  } else if (type === 'def') {
    document.getElementById('box-def').innerHTML = wordObj.definition;
  } else if (type === 'sen') {
    document.getElementById('box-sen').innerHTML = `<em>"${wordObj.sentence}"</em>`;
  }
}

// Text-to-Speech Audio (British English)
function playAudio() {
  const word = currentData[currentIndex].word;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-GB'; // Forces British English pronunciation
  utterance.rate = 0.85; // Slightly slower so students hear it clearly
  window.speechSynthesis.speak(utterance);
}

// Navigation Functions
function nextCard() {
  if (currentIndex < currentData.length - 1) {
    currentIndex++;
    loadCard(currentIndex);
  } else {
    alert("You've reached the end of the deck!");
  }
}

function prevCard() {
  if (currentIndex > 0) {
    currentIndex--;
    loadCard(currentIndex);
  }
}

function shuffleCards() {
  currentData.sort(() => Math.random() - 0.5);
  currentIndex = 0;
  loadCard(currentIndex);
}

// Initialize the first card when the page loads
loadCard(currentIndex);
