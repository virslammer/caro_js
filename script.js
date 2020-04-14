const board_tb = document.getElementById('board')
const gameStatus = document.getElementById('game-status')
const startGame_btn = document.getElementById("startGame")
const resetGame_btn = document.getElementById("resetGame")
var boardInArray = new Array();
var currentPlayer = 'O';
var currentPlayerByNumber;
var lastMove = new Array();
var winMoves = new Array();
const player1 = 'O';
const player2 = 'X';
var boardSize = 16;
var requiredLineLength = 5;
var lineDirections = [
    [0, 1], //horizontal
    [1, 0], //vertical
    [1, -1], //diagonal 1
    [1, 1] //diagonal 2
];

// *** Create board
function CreateBoard(boardSize) {
	var board="";
	for (i = 0; i < boardSize; i++){
		board += "<tr>";
		boardInArray[i] = []
		for (j = 0; j < boardSize; j++){
			board += "<td class='cell' id='" + i+'-'+j +"' ></td>";
			boardInArray[i][j] = 0;
		}
		board += "</tr>";
	}
	board_tb.innerHTML= board
}


// *** Update game status 
function Turn(squareId, player) {
	document.getElementById(squareId).innerHTML = player;
	if (player == player2){
 		currentPlayer = player1
 		gameStatus.innerHTML = 'This is turn of : player 1 (' + currentPlayer +')';
 	}
 	else {
 		currentPlayer = player2
 		gameStatus.innerHTML = 'This is turn of : player 2 (' + currentPlayer +')';
 	}
 	var gameWon = CheckWin(currentPlayerByNumber, lastMove);
 	if (gameWon) {
 		board_tb.classList.add('board-disabled')
 		gameStatus.classList.add('endGame')
 		if (currentPlayer == player1) {
			gameStatus.innerHTML = ' Player 2 (' + player2 + ') win' ;
 		}
 		if (currentPlayer == player2) {
			gameStatus.innerHTML = ' Player 1 (' + player1 + ') win' ;
 		}
 	};
}

// Evaluate the last move and return True if found a row in 5
function CheckWin(player, lastMove) {
    var isWon = false;
    // Check every directions
    for (var i = 0; i < lineDirections.length && !isWon; i++) {
        var shift = lineDirections[i];
        currentSquare = [lastMove[0] + shift[0], lastMove[1] + shift[1]];
        var lineLength = 1;
        winMoves = [lastMove];
        while (lineLength < requiredLineLength && LegalSquare(currentSquare) && boardInArray[currentSquare[0]][currentSquare[1]] === player) {
        	winMoves.push(currentSquare);
            lineLength++;
            currentSquare[0] += shift[0];
            currentSquare[1] += shift[1];
        } 
        // Check the opposite side of the direction
        winMoves = [lastMove];
        currentSquare = [lastMove[0] - shift[0], lastMove[1] - shift[1]];
        
        while (lineLength < requiredLineLength && LegalSquare(currentSquare) && boardInArray[currentSquare[0]][currentSquare[1]] === player) {
        	winMoves.push(currentSquare);
            lineLength++;
            currentSquare[0] -= shift[0];
            currentSquare[1] -= shift[1];
            
        }
        if (lineLength >= requiredLineLength)
            isWon = true;
    }
    return isWon;
}

// Make sure the square is still in the board .
function LegalSquare(square) {
    return square[0] < boardSize && square[1] < boardSize && square[0] >= 0 && square[1] >= 0;
}


function TurnClick(square) {
	
	
	var squareId = square.target.id;
	var boardIndex = squareId.split('-')
	if (this.innerHTML == '') {
		
		if (currentPlayer == player1) {
			boardInArray[Number(boardIndex[0])][Number(boardIndex[1])] = 1;
			currentPlayerByNumber = 1;
			this.style.backgroundColor = '#28445c';
		}
		if (currentPlayer == player2) {
			boardInArray[Number(boardIndex[0])][Number(boardIndex[1])] = 2;
			currentPlayerByNumber = 2;
			this.style.backgroundColor = '#5c2828';
		}
		lastMove[0] = Number(boardIndex[0]);
		lastMove[1] = Number(boardIndex[1]);

		Turn(squareId, currentPlayer);
	}
}

// ******* Event happen when click on Button and Board .

function StartGame() {
	const cells = document.querySelectorAll('.cell');
	startGame_btn.disabled = true;
	board_tb.classList.remove('board-disabled')

	for (var i=0; i<cells.length; i++) {
		cells[i].innerText='';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', TurnClick,false );
	gameStatus.innerHTML = 'This is turn of : player 1 (' + currentPlayer +')';
	
	}
}
function ResetGame() {
	board_tb.classList.remove('board-disabled');
	gameStatus.innerHTML = '';
	gameStatus.classList.remove('endGame')
	startGame_btn.disabled = false;
	currentPlayer = player1;
	CreateBoard(boardSize)
	StartGame()
}


function main() {
	CreateBoard(boardSize);
	startGame_btn.addEventListener('click', StartGame);
	resetGame_btn.addEventListener('click', ResetGame);
}

main()