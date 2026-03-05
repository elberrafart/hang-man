// Super Mario themed word list - extensive for difficulty
const words = [
  "Mario", "Luigi", "Peach", "Bowser", "Toad", "Yoshi", "Koopa", "Goomba",
  "Mushroom", "Star", "Pipe", "Coin", "Block", "Castle", "Kart", "Race", "Princess",
  "Donkey", "Kong", "Wario", "Waluigi", "Daisy", "Rosalina", "Toadette",
  "Kamek", "Boo", "Lakitu", "Blooper", "Cheep", "Hammer", "Magikoopa",
  "Piranha", "Plant", "Thwomp", "Monty", "Mole", "Buzzy", "Beetle", "Spiny",
  "Chain", "Chomp", "Bobomb", "Dry", "Bones", "Fireball", "Shell",
  "Super", "Leaf", "Tanooki", "Cape", "Feather", "Wing", "Power",
  "Question", "Brick", "Hidden", "Warp", "Flagpole", "Axe",
  "Troopa", "Para", "Banzai", "Bullet",
  "Starman", "Invincible", "Platform", "Trampoline", "Cannon",
  "Kingdom", "Rainbow", "Road", "Special", "World", "Overworld",
  "Underworld", "Sky", "Desert", "Ghost", "House", "Ice", "Water", "Lava",
  "Chocolate", "Island", "Valley", "Forest", "Underground", "Fortress", "Airship",
  "Retainer", "Toadstool", "Plumber", "Jump", "Stomp", "Throw", "Collect",
  "Warp", "Piranha", "Monty", "Chain", "Koopa", "Para", "Goomba", "Banzai"
];

let selectedWord;
let selectedLetters;
let lives;
let winner;
let musicStarted = false;

const letterContainer = document.getElementById('letter-container');
letterContainer.addEventListener('click', handleClick);

const bgMusic = document.getElementById('bg-music');
const winMusic = document.getElementById('win-music');
const loseMusic = document.getElementById('lose-music');
const marioCharacter = document.getElementById('mario-character');
const startOverlay = document.getElementById('start-overlay');
const muteBtn = document.getElementById('mute-btn');

// Start overlay - first click starts music and hides overlay (browsers require user interaction for audio)
if (startOverlay) {
  startOverlay.addEventListener('click', function startGame() {
    startOverlay.classList.add('hidden');
    musicStarted = true;
    tryPlayBgMusic();
  });
}

// Mute toggle
if (muteBtn) {
  muteBtn.addEventListener('click', function() {
    const muted = bgMusic.muted;
    bgMusic.muted = !muted;
    muteBtn.textContent = muted ? '🔊 Mute' : '🔇 Unmute';
    muteBtn.classList.toggle('muted', !muted);
  });
}

function tryPlayBgMusic() {
  if (bgMusic && musicStarted && !bgMusic.muted) {
    bgMusic.currentTime = 0;
    bgMusic.play().catch(() => {});
  }
}

function init() {
  const raw = words[Math.floor(Math.random() * words.length)].toLowerCase();
  selectedWord = raw.replace(/[^a-z]/g, '').split('');
  if (selectedWord.length === 0) selectedWord = ['mario'];

  selectedLetters = [];
  lives = 7;
  winner = null;

  // Hide start overlay if we've already started (Play Again)
  if (musicStarted && startOverlay) {
    startOverlay.classList.add('hidden');
  }

  // Reset Mario character
  if (marioCharacter) {
    marioCharacter.classList.remove('mario-win', 'mario-die');
  }

  updateGameEndMessage(null, null);
  resetLives();
  resetLetterStyles();
  render();

  // Start/continue background music
  tryPlayBgMusic();
}

function handleClick(e) {
  // First click might be on start overlay
  if (startOverlay && !startOverlay.classList.contains('hidden')) return;

  const letter = e.target.id;
  if (letter === 'letter-container' || selectedLetters.includes(letter.toLowerCase()) || winner) {
    return;
  }
  const letterLower = letter.toLowerCase();
  selectedLetters.push(letterLower);

  if (!selectedWord.includes(letterLower)) {
    lives -= 1;
    removeLife();
  }

  winner = checkWinner();
  render();

  if (winner) {
    if (winner === 'W') {
      if (marioCharacter) marioCharacter.classList.add('mario-win');
      bgMusic.pause();
      if (winMusic) {
        winMusic.currentTime = 0;
        winMusic.play().catch(() => {});
      }
      document.body.classList.add('win-celebration');
    } else if (winner === 'L') {
      if (marioCharacter) marioCharacter.classList.add('mario-die');
      bgMusic.pause();
      if (loseMusic) {
        loseMusic.currentTime = 0;
        loseMusic.play().catch(() => {});
      }
    }
    return;
  }
}

function checkWinner() {
  if (lives === 0) return 'L';
  let allLettersGuessed = selectedWord.every(letter => selectedLetters.includes(letter));
  return allLettersGuessed ? "W" : null;
}

function removeLife() {
  const livesContainer = document.querySelector('.lives-container');
  if (livesContainer && livesContainer.children.length > 0) {
    livesContainer.removeChild(livesContainer.children[0]);
  }
}

function resetLives() {
  const livesContainer = document.querySelector('.lives-container');
  if (!livesContainer) return;
  livesContainer.innerHTML = '';

  for (let i = 0; i < lives; i++) {
    const lifeImage = document.createElement('img');
    lifeImage.src = 'images/mushroom-lives.png';
    lifeImage.className = 'lives';
    lifeImage.alt = 'Life';
    livesContainer.appendChild(lifeImage);
  }
}

function updateGameEndMessage(message, revealedWord) {
  const livesContainer = document.querySelector('.lives-container');
  if (!livesContainer) return;

  livesContainer.innerHTML = '';

  if (message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'game-end-message';
    messageDiv.textContent = message;
    livesContainer.appendChild(messageDiv);

    if (revealedWord) {
      const wordDiv = document.createElement('div');
      wordDiv.className = 'revealed-word';
      wordDiv.textContent = revealedWord;
      livesContainer.appendChild(wordDiv);
    }

    const playAgainBtn = document.createElement('button');
    playAgainBtn.textContent = 'Play Again';
    playAgainBtn.className = 'play-again-btn';
    playAgainBtn.onclick = function() {
      document.body.classList.remove('win-celebration');
      init();
    };
    livesContainer.appendChild(playAgainBtn);
  }
}

function resetLetterStyles() {
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(function(val) {
    const letterEl = document.getElementById(val.toUpperCase());
    if (letterEl) {
      letterEl.classList.remove('closed-box', 'correct-box');
      letterEl.style.backgroundColor = '#FFC803';
      letterEl.style.backgroundImage = '';
    }
  });
}

function render() {
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(function(val) {
    const letterEl = document.getElementById(val.toUpperCase());
    if (!letterEl) return;
    if (selectedLetters.includes(val) && !selectedWord.includes(val)) {
      letterEl.classList.add('closed-box');
      letterEl.classList.remove('correct-box');
      letterEl.style.backgroundColor = 'transparent';
      letterEl.style.backgroundImage = '';
    } else if (selectedLetters.includes(val) && selectedWord.includes(val)) {
      letterEl.classList.add('correct-box');
      letterEl.classList.remove('closed-box');
      letterEl.style.backgroundColor = '';
      letterEl.style.backgroundImage = '';
    } else {
      letterEl.classList.remove('closed-box', 'correct-box');
      letterEl.style.backgroundColor = '#FFC803';
      letterEl.style.backgroundImage = '';
    }
  });

  const wordContainer = document.getElementById('secret-word');
  if (!wordContainer) return;
  wordContainer.innerHTML = '';

  // Each letter in the word gets its own slot - duplicates fill all instances automatically
  selectedWord.forEach(function(val, idx) {
    const guessedLetter = document.createElement('div');
    guessedLetter.id = 'g-' + val + '-' + idx;
    guessedLetter.classList.add('guessed-letter');
    if (selectedLetters.includes(val)) guessedLetter.innerText = val.toUpperCase();
    wordContainer.appendChild(guessedLetter);
  });

  if (winner) {
    if (winner === 'W') {
      updateGameEndMessage('Congratulations! You won!', null);
    } else if (winner === 'L') {
      const wordStr = selectedWord.join('').toUpperCase();
      updateGameEndMessage('Sorry, you lost! The word was:', wordStr);
    }
    return;
  }
}

init();
