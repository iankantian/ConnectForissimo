ConnectForissimo

WARNING: DO NOT RUN in browser, WILL crash chrome.

This is a connect four game that's played in the browser for a code challenge.

I'll be using vanilla Javascript, HTML5, and if time allows, CSS to simulate the game connect four.

The playing area is a grid of 7 columns and 6 cells each, which will be modelled in Javascript as a 2d array.

Taking a turn will consist of randomly choosing a column and 'dropping' a piece in.  If the topmost cell is occupied
another column will be selected at random.  A final check for tie game will happen upon turn 6 * 7, or 42 turns. For
each turn, victory condition of four cells in a horizontal, vertical, or diagonal line.  These turns are taken
alternating black and red.

Start time 10:10pm
End time 