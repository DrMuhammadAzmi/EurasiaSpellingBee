let currentData = [...masterData];
let currentIndex = 0;
let wordRevealed = false;

// Create filter buttons dynamically based on topics in masterData
function createCategoryButtons() {
  const container = document.getElementById('filter-container');
  if (!container) return;
  container.innerHTML = '';

  const topics = [...new Set(masterData.map(item => item.topic))];
  
  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn active';
  allBtn.innerText = 'All Words';
  allBtn.onclick = () => filterData('All');
  container.appendChild(allBtn);

  topics.forEach(topic => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.innerText = topic;
    btn.onclick = () => filterData(topic);
    container.appendChild(btn);
  });
}

function loadCard(index) {
  if (currentData.length === 0) return;
  const wordObj = currentData[index];
  
  document.getElementById('card-counter').innerText = `${index + 1} of ${currentData.length}`;
  document.getElementById('bottom-counter').innerText = `${index + 1} / ${currentData.length}`;
  document.getElementById('card-topic').innerText = wordObj.topic;
  
  wordRevealed = false;
  const display = document.getElementById('word-display');
  display.innerText = "👁️ Tap to reveal spelling";
  display.className = "word-display word-hidden";

  resetBox('pos', 'PART OF SPEECH', '🧩');
  resetBox('def', 'DEFINITION', '📖');
  resetBox('sen', 'SENTENCE', '💬');
}

function resetBox(type, defaultText, icon) {
  const box = document.getElementById(`box-${type}`);
  box.classList.remove('revealed');
  box.innerHTML = `<div class="toggle-icon">${icon}</div><div class="toggle-text">${defaultText}</div>`;
}

function revealWord() {
  if (!wordRevealed) {
    document.getElementById('word-display').innerText = currentData[currentIndex].word;
    document.getElementById('word-display').className = "word-display";
    wordRevealed = true;
  }
}

function revealInfo(type) {
  const wordObj = currentData[currentIndex];
  const box = document.getElementById(`box-${type}`);
  if (!box.classList.contains('revealed')) {
    box.classList.add('revealed');
    if (type === 'pos') box.innerHTML = `<strong>${wordObj.pos}</strong>`;
    else if (type === 'def') box.innerHTML = `<span>${wordObj.def}</span>`;
    else if (type === 'sen') box.innerHTML = `<em>"${wordObj.sen}"</em>`;
  }
}

function playAudio(speed) {
  window.speechSynthesis.cancel(); 
  const utterance = new SpeechSynthesisUtterance(currentData[currentIndex].word);
  utterance.lang = 'en-GB'; 
  utterance.rate = speed; 
  window.speechSynthesis.speak(utterance);
}

function nextCard() {
  if (currentIndex < currentData.length - 1) {
    currentIndex++;
    loadCard(currentIndex);
  } else {
    alert("Deck completed!");
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

function filterData(topic) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.innerText === topic || (topic === 'All' && btn.innerText === 'All Words'));
  });

  currentData = (topic === 'All') ? [...masterData] : masterData.filter(item => item.topic === topic);
  currentIndex = 0;
  loadCard(currentIndex);
}

window.onload = () => {
  createCategoryButtons();
  loadCard(currentIndex);
};
