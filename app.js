const words = ["Mario", "Luigi", "Peach", "Bowser", "Toad", "Yoshi","Koopa","Goomba", 
"Mushroom", "Star","Pipe", "Coin", "Block", "Castle", "Kart", "Race", "Princess"];

let selectedWord;

let selectedLetters;
let lives;
let winner;

const letterContainer = document.getElementById('letter-container')
letterContainer.addEventListener('click', handleClick)

function toggleClass(letter) {
    let elements = document.getElementById(letter);
    elements.classList.toggle('.closed-box');
}


function init(){
    selectedWord = words[Math.floor(Math.random() * words.length)].toLowerCase().split('')
    selectedLetters = []
    lives = 7
    winner = null

    updateGameEndMessage(null)
    resetLives()
    resetLetterStyles()
    render()
}
init()


function handleClick(e){
    if(e.target.id === 'letter-container' || selectedLetters.includes(e.target.id) || winner){
        return;
    }
    selectedLetters.push(e.target.id);

    if (!selectedWord.includes(e.target.id)) {
        lives -= 1;
        removeLife();
    }

    // Check for winner after each guess, correct or incorrect
    winner = checkWinner();

    render();
}


function checkWinner() {
    if (lives === 0) return 'L';

    let allLettersGuessed = selectedWord.every(letter => selectedLetters.includes(letter));

    return allLettersGuessed ? "W" : null;
}


function removeLife() {
    const livesContainer = document.querySelector('.lives-container')
    if (livesContainer.children.length > 0) {
        livesContainer.removeChild(livesContainer.children[0]);
    }
}

function resetLives() {
    const livesContainer = document.querySelector('.lives-container');
    livesContainer.innerHTML = ''; 

    for (let i = 0; i < lives; i++) {
        const lifeImage = document.createElement('img');
        lifeImage.src = 'images/mushroom-lives.png';
        lifeImage.className = 'lives';
        livesContainer.appendChild(lifeImage);
    }
}


function updateGameEndMessage(message) {
    const livesContainer = document.querySelector('.lives-container');

    livesContainer.innerHTML = '';

    if (message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'game-end-message';
        messageDiv.textContent = message;
        livesContainer.appendChild(messageDiv);

        // Add Play Again button
        const playAgainBtn = document.createElement('button');
        playAgainBtn.textContent = 'Play Again';
        playAgainBtn.onclick = init; 
        livesContainer.appendChild(playAgainBtn);
    }
}

function resetLetterStyles() {
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(function(val){
        const letterEl = document.getElementById(val);
        letterEl.classList.remove('closed-box'); 
        letterEl.style.backgroundColor = '#FFC803'; 
    });
}

function render() {
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(function(val){
        const letterEl = document.getElementById(val)
        if (selectedLetters.includes(val) && !selectedWord.includes(val)) {
            letterEl.classList.add('closed-box')
            letterEl.style.backgroundColor = ''
        }
        if (selectedLetters.includes(val) && selectedWord.includes(val)) letterEl.style.backgroundColor = 'green' 
        else letterEl.style.backgroundColor = '#FFC803' 
    })
    
    const wordContainer = document.getElementById('secret-word')
    wordContainer.innerHTML = ''

    selectedWord.forEach(function(val){
        const guessedLetter = document.createElement('div')
        guessedLetter.id = `g-${val}`
        guessedLetter.classList.add('guessed-letter')
        if (selectedLetters.includes(val)) guessedLetter.innerText = val.toUpperCase()
        wordContainer.appendChild(guessedLetter)
    })

    if (winner) {
        if (winner === 'W') {
            updateGameEndMessage('Congratulations! You won!');
        } else if (winner === 'L') {
            updateGameEndMessage('Sorry, you lost. Try again!');
        }
        return;
    }
}
