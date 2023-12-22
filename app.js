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
    render()
}
init()


function handleClick(e){
    if(e.target.id === 'letter-container' || selectedLetters.includes(e.target.id) || winner){
        return
    }
    selectedLetters.push(e.target.id)
    if (selectedWord.includes(e.target.id)) lives -= 1
    winner = checkWinner()   
    render()
}


//Need a function to check for winner - If selectedLetters are in selectedWords
function checkWinner() {
    if (lives === 0) return 'L'
    
    let allLetters = true

    for(let i = 0; i < selectedWord.length; i++){
        if (!selectedLetters.includes(selectedWord[i])) allLetters = false
    }
    if (allLetters) return "W"

    return null

}

function render() {
    //render letter container
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(function(val){
        const letterEl = document.getElementById(val)
        if (selectedLetters.includes(val) && !selectedWord.includes(val)) {
            letterEl.classList.add('closed-box')
            letterEl.style.backgroundColor = ''
        }
        if (selectedLetters.includes(val) && selectedWord.includes(val)) letterEl.style.backgroundColor = 'green' 
        else letterEl.style.backgroundColor = '#FFC803' 
    })
    
    //render secret word
    const wordContainer = document.getElementById('secret-word')
    wordContainer.innerHTML = ''


    selectedWord.forEach(function(val){
        const guessedLetter = document.createElement('div')
        guessedLetter.id = `g-${val}`
        guessedLetter.classList.add('guessed-letter')
        if (selectedLetters.includes(val)) guessedLetter.innerText = val.toUpperCase()
        wordContainer.appendChild(guessedLetter)
    })
}
