ConnectForissimo

This is a connect four game that's played in the browser for a code challenge.

I'll be using vanilla Javascript, HTML5, and CSS to simulate the game connect four.

The playing area is a grid of 7 columns and 6 cells each, which will be modelled in Javascript as a 2d array.

Taking a turn will consist of randomly choosing a column and 'dropping' a piece in.  If the topmost cell is occupied
another column will be selected at random.  A final check for tie game will happen upon turn 6 * 7, or 42 turns. For
each turn, victory condition will be checked with four cells in a horizontal, vertical, or diagonal line.  These turns
are taken alternating black and red.

'master' branch is incomplete, rudimentary attempt at code challenge, had to give up after an hour.
'postOneHour' branch is me circling around and fixing the code up, mostly works!.  The big bug is that diagonal
victory is not being detected, sometimes.