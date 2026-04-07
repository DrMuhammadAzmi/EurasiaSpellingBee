
    let currentData = [...masterData];
    let currentIndex = 0;
    let wordRevealed = false;

    // Load a card into the UI
    function loadCard(index) {
      const wordObj = currentData[index];
      
      // Update Counters & Topics
      document.getElementById('card-counter').innerText = `${index + 1} of ${currentData.length}`;
      document.getElementById('bottom-counter').innerText = `${index + 1} / ${currentData.length}`;
      document.getElementById('card-topic').innerText = wordObj.topic;
      
      // Hide the word initially
      wordRevealed = false;
      const wordDisplay = document.getElementById('word-display');
      wordDisplay.innerText = "👁️ Tap to reveal spelling";
      wordDisplay.className = "word-display word-hidden";

      // Reset info boxes
      resetBox('pos', 'PART OF SPEECH', '🧩');
      resetBox('def', 'DEFINITION', '📖');
      resetBox('sen', 'SENTENCE', '💬');
    }

    function resetBox(type, defaultText, icon) {
      const box = document.getElementById(`box-${type}`);
      box.classList.remove('revealed');
      box.innerHTML = `<div class="toggle-icon">${icon}</div><div class="toggle-text">${defaultText}</div>`;
    }

    // Reveal the spelling
    function revealWord() {
      if (!wordRevealed) {
        const wordObj = currentData[currentIndex];
        const wordDisplay = document.getElementById('word-display');
        wordDisplay.innerText = wordObj.word;
        wordDisplay.className = "word-display"; // Removes the hidden styling
        wordRevealed = true;
      }
    }

    // Reveal Info Boxes (POS, Def, Sen)
    function revealInfo(type) {
      const wordObj = currentData[currentIndex];
      const box = document.getElementById(`box-${type}`);
      
      // Only change if not already revealed
      if (!box.classList.contains('revealed')) {
        box.classList.add('revealed');
        if (type === 'pos') {
          box.innerHTML = `<strong style="text-transform: uppercase; color: #2980b9;">${wordObj.pos}</strong>`;
        } else if (type === 'def') {
          box.innerHTML = `<span style="color: #444;">${wordObj.def}</span>`;
        } else if (type === 'sen') {
          box.innerHTML = `<em style="color: #444;">"${wordObj.sen}"</em>`;
        }
      }
    }

    // Text to Speech
    function playAudio(speed) {
      // Browsers restrict speech synthesis if it's called too rapidly, cancel previous
      window.speechSynthesis.cancel(); 

      const wordObj = currentData[currentIndex];
      const utterance = new SpeechSynthesisUtterance(wordObj.word);
      
      utterance.lang = 'en-GB'; // British English for Eurasia Spelling Bee
      utterance.rate = speed; // 1 for normal, 0.5 for slow
      
      window.speechSynthesis.speak(utterance);
    }

    // Navigation
    function nextCard() {
      if (currentIndex < currentData.length - 1) {
        currentIndex++;
        loadCard(currentIndex);
      } else {
        alert("🎉 You've reached the end of this deck!");
      }
    }

    function prevCard() {
      if (currentIndex > 0) {
        currentIndex--;
        loadCard(currentIndex);
      }
    }

    // Shuffling
    function shuffleCards() {
      currentData.sort(() => Math.random() - 0.5);
      currentIndex = 0;
      loadCard(currentIndex);
    }

    // Filtering
    function filterData(topicName) {
      // Update UI buttons
      const buttons = document.querySelectorAll('.filter-btn');
      buttons.forEach(btn => {
        if(btn.innerText === topicName || (topicName === 'All' && btn.innerText === 'All Topics') || btn.innerText.includes(topicName.split(' ')[0])) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      // Filter array
      if (topicName === 'All') {
        currentData = [...masterData];
      } else {
        currentData = masterData.filter(item => item.topic === topicName);
      }

      currentIndex = 0;
      if (currentData.length > 0) {
        loadCard(currentIndex);
      } else {
        document.getElementById('word-display').innerText = "No words found.";
      }
    }

    // Initialize first card
    window.onload = () => {
      loadCard(currentIndex);
    };
  </script>
</body>
</html>
