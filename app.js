console.log('hello')

document.addEventListener('DOMContentLoaded', function () {
    // Get a reference to a common parent element that contains the blue pieces
    const parentElement = document.querySelector('.checkerboard');

    // Attach a click event listener to the parent element
    parentElement.addEventListener('click', function (event) {
        // Check if the clicked element has the 'blue-piece' class
        if (event.target.classList.contains('blue-piece')) {
            console.log('Blue piece clicked');
        } else if (event.target.classList.contains('white-piece')) {
            console.log('White piece clicked')
        }
    });
});

function movePiece(piece){
    piece
}

//Checkers!

//When I click on a piece and it's my turn I want to be able to move the piece diagonally.
//Piece can only be moved forward. Piece cannot jump over its own team. Piece can jump over opponent's piece
//If piece is able to jump another in the next move then it is allowed
//If piece reached the other end of the board then it becomes a king. Allowing it to move backwards
//If a players loses all of their pieces then they lose
