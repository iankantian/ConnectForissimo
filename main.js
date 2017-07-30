/**
 * Created by joshuabrown on 7/29/17.
 */
var empty = 0;
var red = 1;
var black = 2;

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
  return Math.floor((Math.random() * 6));
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
  var oldPlayer = red;
  var currentPlayer = black;
  var i, chosen, piecePosition;

  for (i = 1; i < maxTurns; i++) {
    if (oldPlayer = red) {
      oldPlayer = red;
      currentPlayer = black;
    } else {
      oldPlayer = black;
      currentPlayer = red;
    }
      chosen = getRandomColumn();
      piecePosition = drop(currentPlayer, boardArray[chosen]);
    if(piecePosition){
      boardArray[piecePosition] = currentPlayer;
    }
  }
  console.log(boardArray);
}

document.addEventListener('DOMContentLoaded', function playGame() {
  Game();
});

