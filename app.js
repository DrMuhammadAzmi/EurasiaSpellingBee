let currentList = [];
    let index = 0;
    let isRevealed = false;

    // Initialize the application
    function init() {
      createFilters();
      filterData('All Words');
    }

    // Generate topic buttons dynamically
    function createFilters() {
      const container = document.getElementById('topic-filters');
      const topics = [...new Set(masterData.map(item => item.topic))];
      
      container.innerHTML = `<button class="btn-topic active" onclick="filterData('All Words', this)">All Words</button>`;
      
      topics.forEach(t => {
        const btn = document.createElement('button');
        btn.className = 'btn-topic';
        btn.innerText = t;
        btn.onclick = () => filterData(t, btn);
        container.appendChild(btn);
      });
    }

    // Filter cards based on selected category
    function filterData(topic, btnElement = null) {
      if(btnElement) {
        document.querySelectorAll('.btn-topic').forEach(b => b.classList.remove('active'));
        btnElement.classList.add('active');
      }

      if (topic === 'All Words') {
        currentList = [...masterData];
      } else {
        currentList = masterData.filter(item => item.topic === topic);
      }
      
      index = 0;
      renderCard();
    }

    // Display the current card
    function renderCard() {
      if (currentList.length === 0) return;
      const word = currentList[index];
      
      // Update counters and labels
      document.getElementById('counter').innerText = `${index + 1} of ${currentList.length}`;
      document.getElementById('progress-text').innerText = `${index + 1} / ${currentList.length}`;
      document.getElementById('current-topic').innerText = word.topic;
      
      // Reset Spelling Reveal State
      isRevealed = false;
      const sBox = document.getElementById('spelling-box');
      sBox.innerText = "👁️ Tap to reveal spelling";
      sBox.className = "spelling-reveal spelling-hidden";

      // Reset Clue Boxes
      resetClue('pos', '🧩', 'PART OF SPEECH');
      resetClue('def', '📖', 'MEANING');
      resetClue('sen', '💬', 'SENTENCE');
    }

    // Helper to reset individual clue boxes
    function resetClue(id, icon, label) {
      const el = document.getElementById(`clue-${id}`);
      el.classList.remove('revealed');
      el.innerHTML = `<div class="clue-icon">${icon}</div><div>${label}</div>`;
    }

    // Reveal specific clue (Part of Speech, Definition, Sentence)
    function revealClue(type) {
      const word = currentList[index];
      const el = document.getElementById(`clue-${type}`);
      
      if (!el.classList.contains('revealed')) {
        el.classList.add('revealed');
        if (type === 'pos') el.innerHTML = `<strong style="color: #2980b9; text-transform: uppercase;">${word.pos}</strong>`;
        if (type === 'def') el.innerHTML = `<span>${word.def}</span>`;
        if (type === 'sen') el.innerHTML = `<em style="font-size: 0.85rem">"${word.sen}"</em>`;
      }
    }

    // Reveal the actual spelling of the word
    function revealSpelling() {
      if(!isRevealed) {
        const sBox = document.getElementById('spelling-box');
        sBox.innerText = currentList[index].word;
        sBox.classList.remove('spelling-hidden');
        isRevealed = true;
      }
    }

    // Text-to-Speech functionality (British English)
    function speak(rate) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentList[index].word);
      utterance.lang = 'en-GB'; // British English for Eurasia Spelling Bee
      utterance.rate = rate; // 1 for normal, 0.6 for slow
      window.speechSynthesis.speak(utterance);
    }

    // Navigation: Next
    function nextWord() {
      if (index < currentList.length - 1) {
        index++;
        renderCard();
      } else {
        alert("🎉 You've reached the end of this list!");
      }
    }

    // Navigation: Previous
    function prevWord() {
      if (index > 0) {
        index--;
        renderCard();
      }
    }

    // Shuffle the current deck
    function shuffleCards() {
      currentList.sort(() => Math.random() - 0.5);
      index = 0;
      renderCard();
    }

    // Start the app when the window loads
    window.onload = init;
  </script>
