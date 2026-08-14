let hasSword = false;
let swordTimeout = null; 

// NEW FUNCTION: Dynamically generates an in-game styled Restart Overlay screen
function showGameOverScreen(message, isVictory) {
  // Prevent adding duplicate screens if one is already open
  if (document.getElementById("game-over-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "game-over-overlay";
  
  // Custom styles injected to fit perfectly on top of your 1000px centered tile board
  Object.assign(overlay.style, {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    zIndex: "999",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  });

  const heading = document.createElement("h1");
  heading.innerText = message;
  heading.style.fontSize = "36px";
  heading.style.marginBottom = "20px";
  heading.style.color = isVictory ? "#4CAF50" : "#F44336"; // Green for win, Red for loss
  heading.style.textShadow = "0 0 10px rgba(255,255,255,0.2)";

  const subtitle = document.createElement("p");
  subtitle.innerText = "Click the button below to restart the match.";
  subtitle.style.marginBottom = "30px";
  subtitle.style.fontSize = "16px";
  subtitle.style.color = "#ccc";

  const restartBtn = document.createElement("button");
  restartBtn.innerText = "RESTART GAME";
  Object.assign(restartBtn.style, {
    padding: "12px 30px",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: isVictory ? "#4CAF50" : "#F44336",
    color: "#white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
    transition: "transform 0.1s ease"
  });

  // Smooth hover effects via JavaScript attributes
  restartBtn.onmouseover = () => restartBtn.style.transform = "scale(1.05)";
  restartBtn.onmouseout = () => restartBtn.style.transform = "scale(1)";
  
  restartBtn.addEventListener("click", () => {
    location.reload();
  });

  overlay.appendChild(heading);
  overlay.appendChild(subtitle);
  overlay.appendChild(restartBtn);
  
  // Appends cleanly over your parent map node container
  gridElement.appendChild(overlay);
}

function addPlayer() {
  const player = document.createElement("div");
  player.className = "player";
  player.style.backgroundImage = "url('images/hero.png')";
  player.style.backgroundSize = "cover";
  let newRow, newCol;

  do {
    newRow = Math.floor(Math.random() * map.length);
    newCol = Math.floor(Math.random() * map[0].length);
  } while (map[newRow][newCol] === "w");

  player.style.top = `${newRow * cellSize}px`;
  player.style.left = `${newCol * cellSize}px`;
  gridElement.appendChild(player);

  document.addEventListener("keydown", (event) => {
    // Stop character controls completely if a game over layout is active
    if (document.getElementById("game-over-overlay")) return;

    let currentRow = Math.round(parseInt(player.style.top) / cellSize);
    let currentCol = Math.round(parseInt(player.style.left) / cellSize);
    
    switch (event.key) {
      case "ArrowUp":
      case "w":
      case "W":
        if (currentRow > 0 && map[currentRow - 1][currentCol] !== "w") {
          player.style.top = `${(currentRow - 1) * cellSize}px`;
          checkCollision();
        }
        break;
      case "ArrowDown":
      case "s":
      case "S":
        if (currentRow < map.length - 1 && map[currentRow + 1][currentCol] !== "w") {
          player.style.top = `${(currentRow + 1) * cellSize}px`;
          checkCollision();
        }
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        if (currentCol > 0 && map[currentRow][currentCol - 1] !== "w") {
          player.style.left = `${(currentCol - 1) * cellSize}px`;
          checkCollision();
        }
        break;
      case "ArrowRight":
      case "d":
      case "D":
        if (currentCol < map[0].length - 1 && map[currentRow][currentCol + 1] !== "w") {
          player.style.left = `${(currentCol + 1) * cellSize}px`;
          checkCollision();
        }
        break;
    }
  });
}

function checkCollision() {
  const player = document.querySelector(".player");
  if (!player) return;

  const playerTop = parseInt(player.style.top);
  const playerLeft = parseInt(player.style.left);

  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    const enemyTop = parseInt(enemy.style.top);
    const enemyLeft = parseInt(enemy.style.left);

    if (playerTop === enemyTop && playerLeft === enemyLeft) {
      if (hasSword) {
        health -= 5;
        healthBar.updateHealth(health);
        gridElement.removeChild(enemy);
        enemies.splice(i, 1);
        var audio = new Audio("sounds/Sword-Effect.mp3");
        audio.play();
      } else {
        health -= 30;
        healthBar.updateHealth(health);
        gridElement.removeChild(enemy);
        enemies.splice(i, 1);
        var audio = new Audio("sounds/Damage.mp3");
        audio.play();
      }

      // FIXED: Swapped out old alerts for smooth overlay call parameters
      if (health <= 0) {
        var audioDied = new Audio("sounds/Died.mp3");
        audioDied.play();
        setTimeout(() => {
          showGameOverScreen("Game Over! You Died.", false);
        }, 200);
        return; 
      }

      // FIXED: Victory condition now triggers customized non-blocking display screens
      if (enemies.length <= 0) {
        var audioWin = new Audio("sounds/Party.mp3");
        audioWin.play();
        setTimeout(() => {
          showGameOverScreen("Victory! Map Cleared.", true);
        }, 400);
        return;
      }
    }
  }

  for (let i = bandages.length - 1; i >= 0; i--) {
    const bandage = bandages[i];
    const bandageTop = parseInt(bandage.style.top);
    const bandageLeft = parseInt(bandage.style.left);

    if (playerTop === bandageTop && playerLeft === bandageLeft) {
      if (health < 100) {
        health = Math.min(100, health + 15);
        healthBar.updateHealth(health);
        gridElement.removeChild(bandage);
        bandages.splice(i, 1);

        var audio = new Audio("sounds/GetHeal.mp3");
        audio.play();
        audio.volume = 0.4;
      }
    }
  }

  for (let i = swords.length - 1; i >= 0; i--) {
    const sword = swords[i];
    const swordTop = parseInt(sword.style.top);
    const swordLeft = parseInt(sword.style.left);

    if (playerTop === swordTop && playerLeft === swordLeft) {
      player.style.backgroundColor = "yellow";
      gridElement.removeChild(sword);
      swords.splice(i, 1);
      hasSword = true;
      
      clearTimeout(swordTimeout);
      swordTimeout = setTimeout(() => {
        hasSword = false;
        player.style.backgroundColor = ""; 
      }, 8000);
    }
  }
}

function handleSwordAttack(event) {
  if (document.getElementById("game-over-overlay")) return; // blocks attack actions post-game

  if (event.key === " " && hasSword) {
    const player = document.querySelector(".player");
    if (!player) return;

    const playerTop = parseInt(player.style.top);
    const playerLeft = parseInt(player.style.left);

    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      const enemyTop = parseInt(enemy.style.top);
      const enemyLeft = parseInt(enemy.style.left);

      if (
        Math.abs(playerTop - enemyTop) <= cellSize &&
        Math.abs(playerLeft - enemyLeft) <= cellSize
      ) {
        gridElement.removeChild(enemy);
        enemies.splice(i, 1);
        var audio = new Audio("sounds/Sword-Effect.mp3");
        audio.play();
        break; 
      }
    }
  }
}

document.addEventListener("keydown", handleSwordAttack);
addPlayer();
