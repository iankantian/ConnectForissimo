/**
 * Created by joshuabrown on 7/29/17.
 */
var empty = 0;
var red = 1;
var black = 2;

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
      console.log('last');
      if (column[i] !== red || column[i] !== black) {
        result = i;
      }
    }
  }
  console.log('result', result);
  column[result] = player;
  return column;
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

  boardArray[0] = (drop(red, boardArray[0]));
  boardArray[0] = (drop(black, boardArray[0]));
  boardArray[0] = (drop(black, boardArray[0]));
  boardArray[0] = (drop(red, boardArray[0]));
  boardArray[0] = (drop(red, boardArray[0]));
  boardArray[0] = (drop(black, boardArray[0]));
  boardArray[0] = (drop(red, boardArray[0]));


  console.log(boardArray[0]);
}


Game();