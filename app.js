const container = document.getElementById('vocab-container');

// Function to build the interactive cards
function renderVocab(data) {
  data.forEach((item, index) => {
    // Create a card for each word
    const card = document.createElement('div');
    card.className = 'vocab-card';

    card.innerHTML = `
      <div class="word-header">
        <h3>${item.word}</h3>
        <span class="badge">${item.level}</span>
      </div>
      
      <div class="button-group">
        <button onclick="toggleInfo('pos-${index}')">Part of Speech</button>
        <button onclick="toggleInfo('def-${index}')">Definition</button>
        <button onclick="toggleInfo('sen-${index}')">Sentence</button>
      </div>

      <div class="info-group">
        <p id="pos-${index}" class="hidden info-text"><strong>Part of Speech:</strong> ${item.partOfSpeech}</p>
        <p id="def-${index}" class="hidden info-text"><strong>Definition:</strong> ${item.definition}</p>
        <p id="sen-${index}" class="hidden info-text"><strong>Example:</strong> <em>"${item.sentence}"</em></p>
      </div>
    `;
    
    container.appendChild(card);
  });
}

// Function to toggle the hidden text
function toggleInfo(elementId) {
  const element = document.getElementById(elementId);
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}

// Initialize the app
renderVocab(vocabData);
