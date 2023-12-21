const words = ["Mario", "Luigi", "Peach", "Bowser", "Toad", "Yoshi","Koopa","Goomba", 
"Mushroom", "Star","Pipe", "Coin", "Block", "Castle", "Kart", "Race", "Princess"];

const selectedWord = words[1].toLowerCase().split('')

let selectedLetters = []

function toggleClass(letter) {
    let elements = document.getElementById(letter);
    elements.classList.toggle('.closed-box');
}


document.addEventListener('DOMContentLoaded', (event) => {
    // Select all elements with the class 'letter-box'
    let lettersBoxes = document.querySelectorAll('.letter-box');

    function getLetter(evt) {
        let selectedLetter = evt.target.id;

        //If selectedletter is not in selectedLetters list then add to list
        if (selectedLetters.includes(selectedLetter) === false){
            selectedLetters.push(selectedLetter)
            console.log(selectedLetters)
            //Toggle the class .closed-box
            toggleClass(selectedLetter)
        }

        if (selectedWord.includes(selectedLetter)){
            console.log("You got one!")
            //Add letter to bottom
        } else {
            console.log("Wrong!")
            //Lose a life - Erase a mushroom
        }
        
        return selectedLetter
    }

    // Attach the event listener to each letter box
    lettersBoxes.forEach(letterBox => {
        letterBox.addEventListener('click', getLetter);
    });
});

