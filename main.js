/**
 * Created by joshuabrown on 7/29/17.
 */
var empty = undefined;
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

function checkFourWin(currentPlayer, array) {
  var winner, i, j, k;
  var hor = true, vert = true, diagUp = true, diagDn = true;

  for(i = 0; i < array.length; i++) { // crawl every cell and test it as the beginning of a winning row!
    for (j = 0; j < array[i].length; j++) {
      if (array[i][j] !== currentPlayer) { // cell doesn't match the winner you are checking for, no need to check
        hor = false;
        vert = false;
        diagUp = false;
        diagDn = false;
        continue;
      } else {
        try {
          // check horizontal
          try {
            for (k = 0; k < 4; k++) {
              if (array[i + k][j] !== currentPlayer) {
                hor = false
              }
            }
          } catch (f) {
            // console.log('error checking horizontal', f);
          }
          // check vertical
          try {
            for (k = 0; k < 4; k++) {
              if (array[i][j + k] !== currentPlayer) {
                vert = false
              }
            }
          } catch (f) {
            // console.log('error checking vertical', f);
          }
          // check diagonal up
          try {
            for (k = 0; k < 4; k++) {
              if (array[i + k][j - k] !== currentPlayer) {
                diagUp = false
              }
            }
          } catch (f) {
            // console.log('error checking diagUp', f);
          }
          // check diagonal down
          try {
            for (k = 0; k < 4; k++) {
              if (array[i + k][j + k] !== currentPlayer) {
                diagDn = false
              }
            }
          } catch (f) {
            // console.log('error checking diagDn', f);
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
    test = checkFourWin(currentPlayer, boardArray);
    if (test) {
      console.log('winner detected, winner is', test);
    }
  }
  console.log(boardArray);
}

document.addEventListener('DOMContentLoaded', function playGame() {
  Game();
});

