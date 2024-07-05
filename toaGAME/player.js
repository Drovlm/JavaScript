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
            var audio = new Audio("sounds/Sword-Effect.mp3");
            audio.play();
          }
        });
      } else {
        if (playerTop === enemyTop && playerLeft === enemyLeft) {
          if (hasSword) {
            document.addEventListener("keydown", (event) => {
              if (event.key === " ") {
                gridElement.removeChild(enemy);
                enemies.splice(i, 2);
              }
            });
          } else {
            health -= 30;
            healthBar.updateHealth(health);
            gridElement.removeChild(enemy);
            enemies.splice(i, 2);
            var audio = new Audio("sounds/Dammeg.mp3");
            audio.play();
            dd;
            enemies.splice(i, 2);

            if (health <= 10) {
              health -= 10;
              enemies.splice(i, 2);
              var audio = new Audio("sounds/Died.mp3");
              audio.play();
              healthBar.updateHealth(health);
            }
            if (enemies <= 0) {
              alert(
                "Победа \nНажмите «ОК» и подождите, чтобы перезапустить игру. \nЕсли игра не загружается, нажмите еще раз."
              );
              location.reload();
              window.location.href = "index.html";
            }
          }
        }
      }
    }
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
        enemies.splice(i, 1);
        var audio = new Audio("sounds/GetHeal.mp3");
        audio.play();
        audio.volume = 0.4;
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
      hasSword = true;
      console.log("Has a sword:", hasSword);

      setTimeout(() => {
        hasSword = false;
        player.style.backgroundColor = "black";
        console.log("Has a sword:", hasSword);
      }, 8000);
    }
  }
}

addPlayer();
