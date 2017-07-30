/**
 * Created by joshuabrown on 7/29/17.
 */
var empty = null;
var red = false;
var black = true;

/**
 *
 * @param player, red or black piece
 * @param column, number of column to check
 * @returns undefined if column is full, an integer if successful piece placement
 */
function drop(player, column) {
  var result, i;
  if(column[0] === black || column[0] === red) { // check if full already
    return;
  }
  for (i = 0; i < column.length; i++) { // go through the column
    if (i < column.length - 1) { // checking all the way until the next to last row
      if (column[i + 1] !== red && column[i + 1] !== black) {
        continue;
      } else {
        result = i; // a place to put the piece has been located
        break;
      }
    } else {
      if (column[i] !== red || column[i] !== black) {
        result = i;
      }
    }
  }
  column[result] = player;
  return column;
}

function getRandomColumn() {
  return Math.floor((Math.random() * 7));
}

// simply see if the array is completely composed of the currentPlayer's pieces
// will be composed of subsets to the game board's 2d array
function checkWinArray(currentPlayer, array) {
  var i;
  for (i = 0; i < array.length; i++) {
    if (array[i] !== currentPlayer) {
      return false;
    }
  }
  return true;
}

function checkForWin(currentPlayer, array) {
  var winner, i, j, k;
  var hor = false, vert = false, diagUp = false, diagDn = false;
  // console.log('currentPlayer', currentPlayer);
  var dumbCount = 0;
  var testArray = [];
  for(i = 0; i < array.length; i++) { // crawl every cell and test it as the beginning of a winning row!
    for (j = 0; j < array[i].length; j++) {
      dumbCount++;
      if (array[i][j] !== currentPlayer) { // cell doesn't match the winner you are checking for, no need to check
        hor = false;
        vert = false;
        diagUp = false;
        diagDn = false;
        continue;
      } else {
        try {
          // check vertical
          try {
            testArray = [];
            for (k = 0; k < 4; k++) {
              testArray.push(array[i][j + k]);
            }
            vert = checkWinArray(currentPlayer, testArray);
            if (vert) {
              return currentPlayer;
            }
          } catch (f) {
            // console.log('error checking vertical', f);
          }

          // check horizontal
          try {
            testArray = [];
            for (k = 0; k < 4; k++) {
              testArray.push(array[i + k][j]);
            }
            hor = checkWinArray(currentPlayer, testArray);
            if (hor) {
              return currentPlayer;
            }
          } catch (f) {
            // console.log('error checking horizontal', f);
          }

          // check diagonal down
          try {
            testArray = [];
            for (k = 0; k < 4; k++) {
              testArray.push(array[i + k][j - k]);
            }
            diagDn = checkWinArray(currentPlayer, testArray);
            if (diagDn) {
              return currentPlayer;
            }
          } catch (f) {
            // console.log('error checking diagonal down', f);
          }

          // check diagonal up
          try {
            testArray = [];
            for (k = 0; k < 4; k++) {
              testArray.push(array[i + k][j + k]);
            }
            diagUp = checkWinArray(currentPlayer, testArray);
            if (diagUp) {
              return currentPlayer;
            }
          } catch (f) {
            // console.log('error checking diagonal down', f);
          }

        }
        catch (e) {
          // console.warn('error checking for win', e);
        }
      }
    }
  }
  if (hor || vert || diagDn || diagUp) {
    winner = currentPlayer;
  }
  return winner;
}
function Game() {
  /**
   * arranging the columns into arrays, to make the drop() function easy to write
   */
  var boardArray = [
    [empty, empty, empty, empty, empty, empty,],
    [empty, empty, empty, empty, empty, empty,],
    [empty, empty, empty, empty, empty, empty,],
    [empty, empty, empty, empty, empty, empty,],
    [empty, empty, empty, empty, empty, empty,],
    [empty, empty, empty, empty, empty, empty,],
    [empty, empty, empty, empty, empty, empty,],
  ];
  var maxTurns = 42;
  var currentPlayer = black;
  var i, chosen;

  for (i = 0; i < maxTurns; i++) {
    var piecePosition,
        test;
    currentPlayer = !currentPlayer; // flip the state each time
    do {
      chosen = getRandomColumn();
      piecePosition = drop(currentPlayer, boardArray[chosen]);
    } while (piecePosition === undefined);

    boardArray[piecePosition] = currentPlayer;
    test = checkForWin(currentPlayer, boardArray);
    if (test === currentPlayer) {
      console.log('winner detected, winner is', currentPlayer);
      break;
    }
  }
  console.log(boardArray);
}

document.addEventListener('DOMContentLoaded', function playGame() {
  Game();
});

