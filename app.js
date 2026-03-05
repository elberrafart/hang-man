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

const letterContainer = document.getElementById('letter-container');
letterContainer.addEventListener('click', handleClick);

const bgMusic = document.getElementById('bg-music');
const marioCharacter = document.getElementById('mario-character');

function init() {
  const raw = words[Math.floor(Math.random() * words.length)].toLowerCase();
  selectedWord = raw.replace(/[^a-z]/g, '').split('');
  if (selectedWord.length === 0) selectedWord = ['mario'];
  
  selectedLetters = [];
  lives = 7;
  winner = null;

  // Reset Mario character
  marioCharacter.classList.remove('mario-win', 'mario-die');

  updateGameEndMessage(null);
  resetLives();
  resetLetterStyles();
  render();

  // Start background music
  if (bgMusic) {
    bgMusic.currentTime = 0;
    bgMusic.play().catch(() => {}); // Autoplay may be blocked
  }
}

function handleClick(e) {
  if (e.target.id === 'letter-container' || selectedLetters.includes(e.target.id) || winner) {
    return;
  }
  selectedLetters.push(e.target.id);

  if (!selectedWord.includes(e.target.id)) {
    lives -= 1;
    removeLife();
  }

  winner = checkWinner();
  render();

  if (winner) {
    if (winner === 'W') {
      marioCharacter.classList.add('mario-win');
    } else if (winner === 'L') {
      marioCharacter.classList.add('mario-die');
    }
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

function updateGameEndMessage(message) {
  const livesContainer = document.querySelector('.lives-container');
  if (!livesContainer) return;

  livesContainer.innerHTML = '';

  if (message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'game-end-message';
    messageDiv.textContent = message;
    livesContainer.appendChild(messageDiv);

    const playAgainBtn = document.createElement('button');
    playAgainBtn.textContent = 'Play Again';
    playAgainBtn.className = 'play-again-btn';
    playAgainBtn.onclick = init;
    livesContainer.appendChild(playAgainBtn);
  }
}

function resetLetterStyles() {
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(function(val) {
    const letterEl = document.getElementById(val);
    if (letterEl) {
      letterEl.classList.remove('closed-box', 'correct-box');
      letterEl.style.backgroundColor = '#FFC803';
      letterEl.style.backgroundImage = '';
    }
  });
}

function render() {
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(function(val) {
    const letterEl = document.getElementById(val);
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

  selectedWord.forEach(function(val) {
    const guessedLetter = document.createElement('div');
    guessedLetter.id = `g-${val}`;
    guessedLetter.classList.add('guessed-letter');
    if (selectedLetters.includes(val)) guessedLetter.innerText = val.toUpperCase();
    wordContainer.appendChild(guessedLetter);
  });

  if (winner) {
    if (winner === 'W') {
      updateGameEndMessage('Congratulations! You won!');
    } else if (winner === 'L') {
      updateGameEndMessage('Sorry, you lost. Try again!');
    }
    return;
  }
}

init();
