var board = new Array;
var currentPlayer = 'O';
var currentPlayerByNumber;
var lastMove = new Array;
var winMoves = new Array;
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
function createBoard(boardSize) {
	var board="";
	for (i = 0; i < boardSize; i++){
		board += "<tr>";
		for (j = 0; j <boardSize; j++){
			board += "<td class='cell' id='" + i+'-'+j +"' ></td>"
		}
		board += "</tr>";
	}
	document.getElementById('board').innerHTML= board
}
createBoard(boardSize)

function startGame() {
	const cells = document.querySelectorAll('.cell');
	document.querySelector(".endGame").style.display="none";
	document.getElementById("startGame").disabled = true;
	document.getElementById('board').classList.remove('board-disabled')
	var elems = document.getElementsByClassName("createBoard");

	for (var r = 0; r < boardSize; r++) {
	    board[r] = new Array();
	    for (var c = 0; c < boardSize; c++) {
	        board[r][c] = 0;
	    }
	}
	
	for (var i=0; i<cells.length; i++) {
		cells[i].innerText='';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick,false );
	document.getElementById('game-status').innerHTML = 'This is turn of : player 1 (' + currentPlayer +')';
	
	}
}
function resetGame() {
	document.getElementById('board').classList.remove('board-disabled');
	document.getElementById('game-status').innerHTML = '';
	document.getElementById("startGame").disabled = false;
	currentPlayer = player1;
	createBoard(boardSize)
	startGame()
}
function turnClick(square) {
	document.getElementsByClassName('cell').style.backgroundColor = 'white';
	this.style.backgroundColor = '#00ffa6';
	var squareId = square.target.id;
	var boardIndex = squareId.split('-')
	if (this.innerHTML == '') {
		
		if (currentPlayer == player1) {
			board[Number(boardIndex[0])][Number(boardIndex[1])] = 1;
			currentPlayerByNumber = 1;
		}
		if (currentPlayer == player2) {
			board[Number(boardIndex[0])][Number(boardIndex[1])] = 2;
			currentPlayerByNumber = 2;
		}
		lastMove[0] = Number(boardIndex[0]);
		lastMove[1] = Number(boardIndex[1]);

		turn(squareId, currentPlayer);
	}
 	

}

function turn(squareId, player) {
	document.getElementById(squareId).innerHTML = player;
	
	if (player == player2){
 		currentPlayer = player1
 		document.getElementById('game-status').innerHTML = 'This is turn of : player 1 (' + currentPlayer +')';
 	}
 	else {
 		currentPlayer = player2
 		document.getElementById('game-status').innerHTML = 'This is turn of : player 2 (' + currentPlayer +')';
 	}

 	let gameWon = checkWin(currentPlayerByNumber, lastMove);
 	if (gameWon) {
 		document.getElementById('board').classList.add('board-disabled')
 		document.querySelector(".endGame").style.display="block";
 		if (currentPlayer == player1) {
 			document.getElementById('game-status').innerHTML = ' Player 2 (' + player2 + ') win' ;
 			document.querySelector(".endGame").innerText = ' Player 2 win';
 		}
 		if (currentPlayer == player2) {
 			document.getElementById('game-status').innerHTML = ' Player 1 (' + player1 + ') win' ;
 			document.querySelector(".endGame").innerText = ' Player 1 win';
 		}

 	};
}

function checkWin(pl, lastMove) {
    var boolWon = false;
    
    for (var i = 0; i < lineDirections.length && !boolWon; i++) {
    	winMoves = []
        var shift = lineDirections[i];
        var currentSquare = [lastMove[0] + shift[0], lastMove[1] + shift[1]];
        var lineLength = 1;
        winMoves.push(lastMove)

        while (lineLength < requiredLineLength && legalSquare(currentSquare) && board[currentSquare[0]][currentSquare[1]] === pl) {
            lineLength++;
            currentSquare[0] += shift[0];
            currentSquare[1] += shift[1];
            winMoves.push(currentSquare);
        }
        
        currentSquare = [lastMove[0] - shift[0], lastMove[1] - shift[1]];
        while (lineLength < requiredLineLength && legalSquare(currentSquare) && board[currentSquare[0]][currentSquare[1]] === pl) {
        	
            lineLength++;
            currentSquare[0] -= shift[0];
            currentSquare[1] -= shift[1];
            winMoves.push(currentSquare);
            
        }
        if (lineLength >= requiredLineLength)
            boolWon = true;
    }
    return boolWon;
}

function legalSquare(square) {
    return square[0] < boardSize && square[1] < boardSize && square[0] >= 0 && square[1] >= 0;
}

