var oriBoard;
var currentPlayer = 'O';
const player1 = 'O';
const player2 = 'X';
const row = 16
const col = 16
function createBoard(row,col) {
	var board="";
	var id = 1
	for (i = 0; i < row; i++){
		board += "<tr>";
		for (j = 0; j <col; j++){
			board += "<td class='cell' id='" + i+j +"' ></td>"
			id += 1
		}
		board += "</tr>";
	}
	document.getElementById('board').innerHTML= board
}
createBoard(row,col)

function startGame() {
	const cells = document.querySelectorAll('.cell');
	document.querySelector(".endGame").style.display="none";
	document.getElementById("startGame").disabled = true;
	var elems = document.getElementsByClassName("createBoard");
	for(var i = 0; i < elems.length; i++) {
	    elems[i].disabled = true;
	} // Disable change size board 

	oriBoard = Array.from(Array(cells.length).keys());
	for (var i=0; i<cells.length; i++) {
		cells[i].innerText='';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick,false );
	document.getElementById('game-status').innerHTML = 'This is turn of : player 1 (' + currentPlayer +')';
	
	}
}
function resetGame() {
	var elems = document.getElementsByClassName("createBoard");
	for(var i = 0; i < elems.length; i++) {
	    elems[i].disabled = false;
	}
	document.getElementById('game-status').innerHTML = '';
	document.getElementById("startGame").disabled = false;
	currentPlayer = player1;
	createBoard(row,col)
}
function turnClick(square) {

	if (document.getElementById(square.target.id).innerHTML == '') {
		turn(square.target.id, currentPlayer);
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
 	let gameWon = checkWin(oriBoard, player);
 	if (gameWon) gameOver(gameWon);
}
function checkWin(board, player) {

}
