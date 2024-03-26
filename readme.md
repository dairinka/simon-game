# Simon game
### Video Demo: https://youtu.be/8DLfMXuu6rs

### Description: A memory game
Check out this app using the link: https://dairinka.github.io/simon-game/

## How the webpage works?
It's a simple memory game. You need to watch and listen, remember and repeat the sequence of button presses.
Every new task includes all previous ones.

To start, just need to press any key in computer version or press the "Start" button on mobile version.

The game has levels. 

| number of repetitions  | level  |
|---------|--------|
|1-4      |   1    |
|5-9      |   2    |
|10-14    |   3  &nbsp; &nbsp;&nbsp; Cool  |
|15-19    |   4  &nbsp; &nbsp;&nbsp; Fantastic!  |
|20-24    |   5  &nbsp; &nbsp;&nbsp; Unbelievable!!  |
|25-...   |   6 &nbsp; &nbsp;&nbsp; You are just awesome &#128081;  |    



All result are saved into Session storage.
The app also has an information page.

This is a single page application.

## Front-end:

### HTML:
Start page structure.

### CSS:
Used to create visual effects. Responsive layout.

### Javascript:
Used JQuery to create info and results pages and implement game mechanic.

The main idea was to generate a random color and trigger a button press event. The colors generated and the colors clicked by the user are then stored separately.

If these colors match, the user can continue playing. If it doesn't, the game is over.

SNAP.svg was used to animate the folding corner.


