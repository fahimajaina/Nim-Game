let pile = 15;
let isPlayerTurn = true;
const statusText = document.getElementById("status");
const pileText = document.getElementById("pile");

function updateDisplay() {
  pileText.textContent = `Pile: ${pile}`;
}

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

function aiMove() {
  const move = bestMove(pile);
  pile -= move;
  updateDisplay();
  checkGameOver("AI");

  if (pile > 0) {
    isPlayerTurn = true;
    statusText.textContent = "Your turn!";
  }
}


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

//bestmove function
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

// Minimax function to evaluate the best move for the AI
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

updateDisplay();
