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
    switch (event.key) {
      case "ArrowUp":
      case "w":
      case "W":
        if (player.offsetTop > 0) {
          const newRow = Math.floor((player.offsetTop - 25) / cellSize);
          const newCol = Math.floor(player.offsetLeft / cellSize);
          if (map[newRow][newCol] !== "w") {
            player.style.top = `${Math.max(0, newRow * cellSize)}px`;
            checkCollision();
          }
        }
        break;
      case "ArrowDown":
      case "s":
      case "S":
        if (player.offsetTop < gridElement.clientHeight - player.clientHeight) {
          const newRow = Math.floor((player.offsetTop + 25) / cellSize);
          const newCol = Math.floor(player.offsetLeft / cellSize);
          if (map[newRow][newCol] !== "w") {
            player.style.top = `${Math.min(
              gridElement.clientHeight - player.clientHeight,
              newRow * cellSize
            )}px`;
            checkCollision();
          }
        }
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        if (player.offsetLeft > 0) {
          const newRow = Math.floor(player.offsetTop / cellSize);
          const newCol = Math.floor((player.offsetLeft - 25) / cellSize);
          if (map[newRow][newCol] !== "w") {
            player.style.left = `${Math.max(0, newCol * cellSize)}px`;
            checkCollision();
          }
        }
        break;
      case "ArrowRight":
      case "d":
      case "D":
        if (player.offsetLeft < gridElement.clientWidth - player.clientWidth) {
          const newRow = Math.floor(player.offsetTop / cellSize);
          const newCol = Math.floor((player.offsetLeft + 25) / cellSize);
          if (map[newRow][newCol] !== "w") {
            player.style.left = `${Math.min(
              gridElement.clientWidth - player.clientWidth,
              newCol * cellSize
            )}px`;
            checkCollision();
          }
        }
        break;
    }
  });
}
let hasSword = false;
function checkCollision() {
  const player = document.querySelector(".player");
  const playerTop = parseInt(player.style.top);
  const playerLeft = parseInt(player.style.left);

  function isWithinOneBlock(pos1, pos2) {
    return Math.abs(pos1 - pos2) <= cellSize;
  }

  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const enemyTop = parseInt(enemy.style.top);
    const enemyLeft = parseInt(enemy.style.left);

    if (
      isWithinOneBlock(playerTop, enemyTop) &&
      isWithinOneBlock(playerLeft, enemyLeft)
    ) {
      if (hasSword) {
        document.addEventListener("keydown", (event) => {
          if (event.key === " ") {
            gridElement.removeChild(enemy);
            enemies.splice(i, 1);
          }
        });
      } else {  if (playerTop === enemyTop && playerLeft === enemyLeft) {
        if (hasSword) {
          document.addEventListener("keydown", (event) => {
            if (event.key === " ") {
              gridElement.removeChild(enemy);
              enemies.splice(i, 1);
            }
          });
        } else {
        health -= 30;
        healthBar.updateHealth(health);
        gridElement.removeChild(enemy);
        enemies.splice(i, 1);

        if (health <= 10) {
          health -= 10;
          healthBar.updateHealth(health);
        }
      }}
    }}
  }

  for (const i in bandages) {
    const bandage = bandages[i];
    const bandageTop = parseInt(bandage.style.top);
    const bandageLeft = parseInt(bandage.style.left);

    if (playerTop === bandageTop && playerLeft === bandageLeft) {
      if (health == 100) {
        health += 0;
        healthBar.updateHealth(health);
      } else {
        health += 15;
        healthBar.updateHealth(health);
        gridElement.removeChild(bandage);
        bandages.splice(i, 1);
      }
    }
  }

  for (let i = 0; i < swords.length; i++) {
    const sword = swords[i];
    const swordTop = parseInt(sword.style.top);
    const swordLeft = parseInt(sword.style.left);

    if (playerTop === swordTop && playerLeft === swordLeft) {
      player.style.backgroundColor = "yellow";
      gridElement.removeChild(sword);
      swords.splice(i, 1);
      i--;
      hasSword = true;
      console.log("Has a sword:", hasSword);

      setTimeout(() => {
        hasSword = false;
        player.style.backgroundColor = "black";
        console.log("Has a sword:", hasSword);
      }, 5000);
    }
  }
}

addPlayer();
