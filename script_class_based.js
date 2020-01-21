/// CLASS CONSTRUCTION

function Board(boardSize) {
	this.boardSize = boardSize;
	this.boardInArray = new Array();
	this.drawBoard = function() {
		var board="";
		for (i = 0; i < this.boardSize; i++){
			board += "<tr>";
			this.boardInArray[i] = new Array();
			for (j = 0; j < this.boardSize; j++){
				board += "<td class='cell' id='" + i+'-'+j +"' ></td>"
				this.boardInArray[i][j] = 0;
			}
		board += "</tr>";
		}
		return board
	}

}

function Player(symbol, index) {
	this.symbol = symbol;
	this.index = index;
	this.lastMove = [];
}


/// ADD EVENT TO INDEX 

function startGame() {
	board = new Board(16);
	player1 = new Player('O',1);
	player2 = new Player('X',2);
	currentPlayer = player1;
	lastMove = []
	document.getElementById('board').innerHTML = board.drawBoard();
	const cells = document.querySelectorAll('.cell');
	for (var i=0; i<cells.length; i++) {
		cells[i].innerText='';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick,false );
	}
}

function turnClick() {
	if (this.innerHTML == '') {
		var boardIndex = this.id.split('-');
		if (currentPlayer == player1) {
			board[Number(boardIndex[0])][Number(boardIndex[1])] = 1;
		}
		if (currentPlayer == player2) {
			board[Number(boardIndex[0])][Number(boardIndex[1])] = 2;
		}
		lastMove[0] = Number(boardIndex[0]);
		lastMove[1] = Number(boardIndex[1]);

		turn(this.id, currentPlayer);
	}
}

function turn(squareId, player) {
	document.getElementById(squareId).innerHTML = player.symbol;
	
	if (player == player2){
 		currentPlayer = player1
 		document.getElementById('game-status').innerHTML = 'This is turn of : player 1 (' + currentPlayer.symbol +')';
 	}
 	else {
 		currentPlayer = player2
 		document.getElementById('game-status').innerHTML = 'This is turn of : player 2 (' + currentPlayer.symbol +')';
 	}
 }