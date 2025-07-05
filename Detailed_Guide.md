# Nim Game with AI - Detailed Implementation Guide

Welcome to this detailed guide to the Nim game with AI! This document will help you understand how the game works, its key features, and break down the important functions in the codebase. This guide is designed for beginners who want to understand the implementation of a classic mathematical strategy game with an intelligent opponent.

## Table of Contents

1. [Game Overview](#game-overview)
2. [Project Structure](#project-structure)
3. [HTML Structure](#html-structure)
4. [CSS Styling](#css-styling)
5. [JavaScript Implementation](#javascript-implementation)
   - [Core Game Logic](#core-game-logic)
   - [AI Implementation](#ai-implementation)
6. [Deep Dive into the Minimax Algorithm](#deep-dive-into-the-minimax-algorithm)
7. [Extending the Game](#extending-the-game)

## Game Overview

This is a Nim game where you play against an AI opponent that uses the minimax algorithm to make optimal moves. The game features:

- A clean, modern interface with custom styling
- Player vs. AI gameplay
- Visual feedback for game states
- Win detection with appropriate messaging
- Unbeatable AI using the minimax algorithm
- Restart functionality to play multiple games

In this implementation of Nim:
- The game starts with a pile of 15 objects
- Players take turns removing 1, 2, or 3 objects
- The player who takes the last object wins
- You play first, followed by the AI

## Project Structure

The project follows this simple structure:

```
nim-game/
├── index.html      # Main HTML file with game structure
├── style.css       # Styling for the game interface
├── script.js       # Game logic and AI implementation
└── README.md       # Basic information about the project
```

## HTML Structure

The `index.html` file sets up a minimal structure for the game:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nim Game</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>Nim Game</h1>
    <p id="status">Your turn!</p>
    <div id="pile">Pile: 15</div>
    <div class="buttons">
      <button onclick="playerMove(1)">Take 1</button>
      <button onclick="playerMove(2)">Take 2</button>
      <button onclick="playerMove(3)">Take 3</button>
    </div>
    <button id="resetBtn" onclick="resetGame()">Restart</button>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

Key components:
- **Game Title**: Simple heading that identifies the game
- **Status Display**: A paragraph element to show game status messages
- **Pile Display**: Shows how many objects remain in the pile
- **Move Buttons**: Three buttons that let the player take 1, 2, or 3 objects
- **Restart Button**: Allows players to start a new game
- **Script Reference**: Links to the JavaScript file containing game logic

## CSS Styling

The `style.css` file contains styling for the game's visual appearance. The styling includes:

- **Layout**: Centered container with appropriate spacing
- **Visual Design**: Clean, minimalist design with modern aesthetics
- **Interactive Elements**: Styling for buttons with hover effects
- **Game State Visualization**: Clear display of pile size and game status

### Key CSS Features

```css
body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  min-height: 100vh;
  margin: 0;
  justify-content: center;
  align-items: center;
}

.container {
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  text-align: center;
  width: 340px;
  backdrop-filter: blur(10px);
}

.buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 20px 0;
}

.buttons button {
  background: #667eea;
  color: white;
  border: none;
  padding: 15px 0;
  font-size: 1.2em;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.buttons button:hover {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}
```

## JavaScript Implementation

The `script.js` file contains all the game logic and AI implementation. Let's break down the key parts:

### Core Game Logic

#### Game State Management

```javascript
let pile = 15;           // Initial pile size
let isPlayerTurn = true; // Player starts first
const statusText = document.getElementById("status");
const pileText = document.getElementById("pile");

function updateDisplay() {
  pileText.textContent = `Pile: ${pile}`;
}
```

This section sets up the core variables that manage the game state:
- `pile`: Tracks how many objects remain in the pile
- `isPlayerTurn`: Tracks whose turn it is (true for player, false for AI)
- DOM elements are cached for better performance
- `updateDisplay()` refreshes the UI when the pile size changes

#### Handling Player Moves

```javascript
function playerMove(amount) {
  if (!isPlayerTurn || pile <= 0 || amount > pile) return;
  pile -= amount;
  updateDisplay();
  
  if (pile <= 0) {
    checkGameOver("You");
    return;  // End the game if player wins
  }
  
  isPlayerTurn = false;
  statusText.textContent = "AI is thinking...";
  setTimeout(aiMove, 900);
}
```

This function handles the player's move:
1. Validates that it's the player's turn and the move is legal
2. Updates the pile by subtracting the chosen amount
3. Updates the display to show the new pile size
4. Checks if the player has won by taking the last object
5. If not, switches to the AI's turn with a delay to create a more natural experience

#### AI Move Logic

```javascript
function aiMove() {
  const move = bestMove(pile);
  pile -= move;
  updateDisplay();
  checkGameOver("AI");
  isPlayerTurn = true;
  if (pile > 0) {
    statusText.textContent = "Your turn!";
  }
}
```

This function handles the AI's move:
1. Calculates the best move using the minimax algorithm
2. Updates the pile by subtracting the AI's chosen amount
3. Updates the display to show the new pile size
4. Checks if the AI has won by taking the last object
5. If not, switches back to the player's turn

#### Win Detection and Game Reset

```javascript
function checkGameOver(player) {
  if (pile <= 0) {
    statusText.textContent = `${player} wins!`;
    isPlayerTurn = false;
  }
}

function resetGame() {
  pile = 15;
  isPlayerTurn = true;
  updateDisplay();
  statusText.textContent = "Your turn!";
}
```

These functions:
1. Check if the game is over (pile is empty)
2. Display a message indicating who won
3. Reset the game to its initial state when requested

### AI Implementation

#### Finding the Best Move

```javascript
function bestMove(currentPile) {
  let bestVal = -Infinity;
  let move = 1;

  for (let i = 1; i <= 3; i++) {
    if (i > currentPile) break;
    let val = minimax(currentPile - i, false);
    if (val > bestVal) {
      bestVal = val;
      move = i;
    }
  }

  return move;
}
```

This function determines the AI's best move by:
1. Iterating through all possible moves (taking 1, 2, or 3 objects)
2. For each move, evaluating the resulting position using the minimax algorithm
3. Tracking which move yields the highest score
4. Returning the best move

#### The Minimax Algorithm

```javascript
function minimax(pile, isMaximizing) {
  if (pile === 0) {
    return isMaximizing ? -1 : 1;
  }

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 1; i <= 3; i++) {
      if (i <= pile) {
        best = Math.max(best, minimax(pile - i, false));
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 1; i <= 3; i++) {
      if (i <= pile) {
        best = Math.min(best, minimax(pile - i, true));
      }
    }
    return best;
  }
}
```

This is the core of the AI's intelligence. The minimax algorithm:

1. **Evaluates terminal states**:
   - If pile is 0, returns 1 or -1 depending on whose turn it is
   - A positive value means the AI wins, a negative value means the player wins

2. **Recursively explores all possibilities**:
   - When maximizing (AI's turn), it chooses the highest score
   - When minimizing (human's turn), it assumes the human will choose the lowest score
   - This creates a complete game tree exploration

3. **Simulates both players playing optimally**:
   - Makes each move, evaluates it recursively
   - Builds a complete decision tree for the game

## Deep Dive into the Minimax Algorithm

### How Minimax Works in Nim

Minimax is a decision-making algorithm used in two-player zero-sum games with perfect information. In Nim:

1. **Terminal State**: The player who takes the last stone wins
2. **Scoring**: A winning position has a value of 1, a losing position has a value of -1
3. **Players**: The maximizing player (AI) aims to maximize the score, the minimizing player (human) aims to minimize it

### The Mathematical Pattern in Nim

In the standard game of Nim, there's an optimal strategy based on nim-sum calculation. However, our minimax implementation determines this optimal play automatically by exhaustively exploring all possible game states.

In our specific case (1-3 stones taken per turn, 15 initial stones), the winning strategy is:
- Take stones to leave a multiple of 4 (4, 8, 12)
- If you can't leave a multiple of 4, you're in a losing position

The AI uses minimax to discover this pattern automatically by exploring the game tree.

### Example Scenario

Let's walk through a simple example to understand how the AI makes decisions:

Consider a pile with 5 stones. The AI is deciding how many to take:

#### For taking 1 stone:
1. Pile becomes 4
2. Player can take 1, 2, or 3
   - If player takes 1, pile becomes 3, AI can take 3 and win → Score +1
   - If player takes 2, pile becomes 2, AI can take 2 and win → Score +1
   - If player takes 3, pile becomes 1, AI can take 1 and win → Score +1
3. Best score for player is still -1, so AI scores +1 for taking 1 stone

#### For taking 2 stones:
1. Pile becomes 3
2. Player can take 1, 2, or 3
   - If player takes 1, pile becomes 2, AI can take 2 and win → Score +1
   - If player takes 2, pile becomes 1, AI can take 1 and win → Score +1
   - If player takes 3, pile becomes 0, player wins → Score -1
3. Best score for player is -1, so AI scores -1 for taking 2 stones

#### For taking 3 stones:
1. Pile becomes 2
2. Player can take 1 or 2
   - If player takes 1, pile becomes 1, AI can take 1 and win → Score +1
   - If player takes 2, pile becomes 0, player wins → Score -1
3. Best score for player is -1, so AI scores -1 for taking 3 stones

Since taking 1 stone yields the highest score (+1), the AI will choose to take 1 stone, leaving 4 stones in the pile. This is the optimal move because it forces the player into a losing position (a pile of 4 is a winning position for the AI).

### The Recursive Nature of Minimax

The power of minimax comes from its recursive structure:

1. For each possible move, it simulates making that move
2. Then it switches to the opponent and considers all their possible responses
3. Then it switches back to the original player and considers all possible counter-responses
4. This continues until reaching terminal states (win/loss)
5. Scores propagate back up the tree to determine the optimal first move

### Time Complexity

For Nim, the minimax algorithm's complexity depends on the branching factor (maximum 3 in our case) and the depth of the game tree (related to the initial pile size). For a pile of size N:
- Time complexity: O(3^N) in the worst case
- Space complexity: O(N) for the recursion stack

For our initial pile of 15, this is very manageable, but for much larger piles, optimization techniques like memoization would be beneficial.

## Extending the Game

Want to enhance this Nim game? Here are some ideas:

### Difficulty Levels

Implement different AI difficulties:
- **Easy**: Make random moves or deliberately make suboptimal choices
- **Medium**: Make optimal moves 50% of the time, random moves otherwise
- **Hard**: Current implementation (unbeatable when starting with the right position)

### Game Variations

1. **Different starting pile sizes**: Allow the player to choose the initial pile size
2. **Different move ranges**: Allow taking 1-4 stones or any other range
3. **Multiple piles**: Implement the classic multi-pile version of Nim

### Visual Enhancements

1. **Visual representation of the pile**: Show actual objects that disappear when taken
2. **Animations**: Add animations when objects are removed
3. **Sound effects**: Add sound when stones are taken

### Technical Improvements

1. **Memoization**: Optimize the minimax algorithm for larger pile sizes
2. **Responsive design**: Improve mobile support
3. **Local storage**: Save game statistics

## Conclusion

This Nim game demonstrates several important programming concepts:

1. **Game State Management**: Tracking and updating the state of a game
2. **AI Decision Making**: Using the minimax algorithm for intelligent decisions
3. **DOM Manipulation**: Dynamically updating the UI based on game state
4. **Event Handling**: Responding to user interactions
5. **Recursive Algorithms**: Using recursion to explore game possibilities

The minimax algorithm implementation makes this simple game surprisingly sophisticated, creating an unbeatable AI opponent. By understanding how this works, you've gained insights into a fundamental algorithm used in various games and decision-making systems.

Feel free to use this project as a starting point to build more complex games or to experiment with different AI approaches!

---

Happy coding and gaming!