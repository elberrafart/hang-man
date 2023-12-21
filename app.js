const words = ["Mario", "Luigi", "Peach", "Bowser", "Toad", "Yoshi","Koopa","Goomba", 
"Mushroom", "Star","Pipe", "Coin", "Block", "Castle", "Kart", "Race", "Princess"];

let selectedLetters = []

const selectedWord = words[1].toLowerCase().split('')

const toggleBox = function(){
    this.classList.toggle('.closed-box')
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
        }
        if (selectedWord.includes(selectedLetter)){
            console.log("You got one!")
        }
        
        return selectedLetter
    }

    // Attach the event listener to each letter box
    lettersBoxes.forEach(letterBox => {
        letterBox.addEventListener('click', getLetter);
    });
});

