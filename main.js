/**
 * Created by joshuabrown on 7/29/17.
 */
var empty = null;
var red = false;
var black = true;
var howManyInARow = 4;
var redColor = 'red';
var blackColor = 'black';

/**
 *
 * @param player, red or black piece
 * @param column, number of column to check
 * @returns undefined if column is full, an integer if successful piece placement
 */
function drop(player, column) {
  var result, i;
  if (column[0] === black || column[0] === red) { // check if full already
    return;
  }
  for (i = 0; i < column.length; i++) { // go through the column
    if (i < column.length - 1) { // checking all the way until the next to last row
      if (column[i + 1] !== red && column[i + 1] !== black) { // is there a next cell to drop to?
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

function convertPlayerName(symbol) {
  var name = null;
  if (symbol === red) {
    name = 'red';
  } else {
    name = 'black';
  }
  return name;
}

function getRandomColumn() {
  return Math.floor((Math.random() * 7));
}

// simply see if the array is completely composed of the currentPlayer's pieces
// will be composed of subsets to the game board's 2d array
function checkSubArray(currentPlayer, array) {
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
  var dumbCount = 0;
  var testArray = [];
  for (i = 0; i < array.length; i++) { // crawl every cell and test it as the beginning of a winning row!
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
            for (k = 0; k < howManyInARow; k++) {
              testArray.push(array[i][j + k]); // assemble array
            }
            vert = checkSubArray(currentPlayer, testArray);
            if (vert) {
              return currentPlayer;
            }
          } catch (f) {
            console.log('error checking vertical', f);
          }

          // check horizontal
          try {
            if (i < array.length - howManyInARow - 1) {
              testArray = [];
              for (k = 0; k < howManyInARow; k++) {
                testArray.push(array[i + k][j]);
              }
              hor = checkSubArray(currentPlayer, testArray);
              if (hor) {
                return currentPlayer;
              }
            }
          } catch (f) {
            console.log('error checking horizontal i is ' + (i + k), f, array);
          }

          // check diagonal down
          try {
            if (i < array.length - howManyInARow - 1) {
              testArray = [];
              for (k = 0; k < howManyInARow; k++) {
                testArray.push(array[i + k][j - k]);
              }
              diagDn = checkSubArray(currentPlayer, testArray);
              if (diagDn) {
                return currentPlayer;
              }
            }
          } catch (f) {
            console.log('error checking diagonal down j - k is ' + (j - k), f, array);
          }

          // check diagonal up
          try {
            testArray = [];
            for (k = 0; k < howManyInARow; k++) {
              testArray.push(array[i + k][j + k]);
            }
            diagUp = checkSubArray(currentPlayer, testArray);
            if (diagUp) {
              return currentPlayer;
            }
          } catch (f) {
            console.log('error checking diagonal up', f);
          }

        }
        catch (e) {
          console.warn('error checking for win', e);
        }
      }
    }
  }
  if (hor || vert || diagDn || diagUp) {
    winner = currentPlayer;
  }
  return winner;
}

function getSevenBySixArray() { // empty game board
  /**
   * arranging the columns into arrays, to make the drop() function easy to write
   */
  return [
    [empty, empty, empty, empty, empty, empty,],
    [empty, empty, empty, empty, empty, empty,],
    [empty, empty, empty, empty, empty, empty,],
    [empty, empty, empty, empty, empty, empty,],
    [empty, empty, empty, empty, empty, empty,],
    [empty, empty, empty, empty, empty, empty,],
    [empty, empty, empty, empty, empty, empty,],
  ]
}
function getDiagonalDownRed() { // test condition
  /**
   * arranging the columns into arrays, to make the drop() function easy to write
   */
  return [
    [empty, empty, empty, empty, empty, empty,],
    [empty, empty, empty, empty, empty, empty,],
    [empty, empty, empty, empty, red, empty,],
    [empty, empty, empty, red, empty, empty,],
    [empty, empty, red, empty, empty, empty,],
    [empty, red, empty, empty, empty, empty,],
    [empty, empty, empty, empty, empty, empty,],
  ]
}

function getDiagonalUpRed() { // test condition
  /**
   * arranging the columns into arrays, to make the drop() function easy to write
   */
  return [
    [empty, empty, empty, empty, empty, empty,],
    [empty, red, empty, empty, empty, empty,],
    [empty, empty, red, empty, empty, empty,],
    [empty, empty, empty, red, empty, empty,],
    [empty, empty, empty, empty, red, empty,],
    [empty, empty, empty, empty, empty, empty,],
    [empty, empty, empty, empty, empty, empty,],
  ]
}

function getHorizontalBlack() { // test condition
  /**
   * arranging the columns into arrays, to make the drop() function easy to write
   */
  return [
    [empty, black, empty, empty, empty, empty,],
    [empty, black, empty, empty, empty, empty,],
    [empty, black, empty, empty, empty, empty,],
    [empty, black, empty, empty, empty, empty,],
    [empty, black, empty, empty, empty, empty,],
    [empty, black, empty, empty, empty, empty,],
    [empty, black, empty, empty, empty, empty,],
  ]
}

function getStuffedTopRow() { // test condition
  /**
   * arranging the columns into arrays, to make the drop() function easy to write
   */
  return [
    [black, empty, empty, empty, empty, empty,],
    [red, empty, empty, empty, empty, empty,],
    [black, empty, empty, empty, empty, empty,],
    [red, empty, empty, empty, empty, empty,],
    [black, empty, empty, empty, empty, empty,],
    [red, empty, empty, empty, empty, empty,],
    [black, empty, empty, empty, empty, empty,],
  ]
}

function renderBoard(array, element) { // render the results of the board
  for (var i = 0, l = array.length; i < l; i++) {
    for (var j = 0, m = array[i].length; j < m; j++) {
      switch (array[i][j]) {
        case red:
          element.rows[i].cells[j].style.backgroundColor = redColor;
          break;
        case black:
          element.rows[i].cells[j].style.backgroundColor = blackColor;
          break;
        default:
          break;
      }
    }
  }
}

function showResult(message, element) {
  element.innerHTML = message;
}
/**
 *
 * @param boardArray pass the initial game state array
 * @param boardElement pass the document element containing a table representing the board.
 * @constructor
 */
function Game(boardArray, boardElement, outputElement) {
  var maxTurns = boardArray.length * boardArray[0].length;
  var currentPlayer = red;
  var i, chosen, test;
  var dumbCount = 0;

  for (i = 0; i < maxTurns; i++) {
    var columnInPlay;
    currentPlayer = !currentPlayer; // flip the state, alternating turns

    dumbCount = 0;
    do {
      chosen = getRandomColumn();
      columnInPlay = drop(currentPlayer, boardArray[chosen]);
      dumbCount++;
    } while (columnInPlay === undefined && dumbCount < boardArray.length); // test for good drop OR no more cells left

    renderBoard(boardArray, boardElement);

    test = checkForWin(currentPlayer, boardArray);
    if (test === currentPlayer) {
      showResult(convertPlayerName(currentPlayer) + ' wins!', outputElement);
      console.log(currentPlayer + ' wins!');
      break;
    }
  }
  if (test === undefined) {
    console.log('cat\'s game');
    showResult('Cat\'s Game', outputElement);
  }
  console.log('completed board', boardArray); // show result in the console log
}

document.addEventListener('DOMContentLoaded', function playGame() {
  Game(
    getSevenBySixArray(),
    document.getElementById('game_board'),
    document.getElementById('output')
  )
});

