// GAME LOGIC under here.

function generateGameLayout() {

  var gameSection = document.getElementById('game-section');
  var board       = document.createElement('ul');
  board.className = 'game-board';

  for (var i = 1; i <= 9; i++) {

    var node = document.createElement('li');
    node.addEventListener('click', function(event) {
      makeTurn(event.target);
    });

    node.id = i;

    board.appendChild(node);
  }

  gameSection.appendChild(board);
}

var isPlayerOne = true;
var playedTurns = 0;

function makeTurn(node) {

  // Check if field is empty to make a move.
  if (!fieldEmpty(node)) {
    return;
  }

  if (isPlayerOne) {

    setCross(node);
    isPlayerOne = false;
    playedTurns++;

  } else if(!isPlayerOne) {

    makeTurnAI();
    isPlayerOne = true;
    playedTurns++;
  }

  checkForWinner();
}

function makeTurnAI() {
  // Implement AI board analyze
  // Check for best move
  // Make move
}

// Check if max turns are played, then reset the board.
function gameEnded() {
  return playedTurns < 9 ? false : true;
}

function checkForWinner() {

  // Possible ways how a player could win.
  const winningDataSets = [
    // Horizontal
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],

    // Vertical
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],

    // Diagonal
    ['1', '5', '9'],
    ['3', '5', '7']
  ]

  // Get claimed fields of both players.
  const playerOneNodes = Array.from(document.getElementsByClassName('crossed'));
  const playerTwoNodes = Array.from(document.getElementsByClassName('circled'));

  winningDataSets.forEach((dataSet) => {

    // Points will be automatically set to 0 when iteration is over.
    var playerOnePoints = 0;
    var playerTwoPoints = 0;

    // Count the points of both players.
    playerOnePoints = countPlayerPoints(playerOneNodes, dataSet, playerOnePoints);
    playerTwoPoints = countPlayerPoints(playerTwoNodes, dataSet, playerTwoPoints);

    // Check if any player has claimed a winning streak!
    checkForWinningPlayer(playerOnePoints, 'yellow');
    checkForWinningPlayer(playerTwoPoints, 'orange');
  });

  if (gameEnded()) {
    alert('Nobody won the game ..');
    newGame();
  }
}

function checkForWinningPlayer(playerPoints, winningColor) {
  if (playerPoints >= 3) {
    alert(`The ${winningColor} player wins the game!`);
    newGame();
  }
}

function countPlayerPoints(nodes, dataSet, playerPoints) {
  nodes.forEach((node) => {
    if (dataSet.includes(node.id)) playerPoints++;
  });

  return playerPoints;
}

function fieldEmpty(node, state) {
  return node.className == '' ? true : false;
}

function setCross(node) {
  node.className = 'crossed';
}

function setCircle(node) {
  node.className = 'circled';
}

function newGame() {

  // Reset game values.
  isPlayerOne = true;
  playedTurns = 0;

  // Take first item out of the HTMLCollection and remove it so it wipes the board.
  document.getElementsByClassName('game-board')[0].remove();

  // Generate a new fresh board.
  generateGameLayout();
}

// Generate game elements so the game can be played.
generateGameLayout();
