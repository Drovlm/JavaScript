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
let swordTimeout = null; 
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

    if (isWithinOneBlock(playerTop, enemyTop) && isWithinOneBlock(playerLeft, enemyLeft)) {
      if (playerTop === enemyTop && playerLeft === enemyLeft) {
        if (hasSword) {
          health -= 5;
          healthBar.updateHealth(health);
          gridElement.removeChild(enemy);
          enemies.splice(i, 1);
          enemy.style.opacity = 0;
          enemy.style.display = "none";
          var audio = new Audio("sounds/Sword-Effect.mp3");
          audio.play();
        } else {
          health -= 30;
          healthBar.updateHealth(health);
          gridElement.removeChild(enemy);
          enemies.splice(i, 1);
          enemy.style.opacity = 0;
          enemy.style.display = "none";
          var audio = new Audio("sounds/Damage.mp3");
          audio.play();

          if (health <= 10) {
            health -= 10;
            var audio = new Audio("sounds/Died.mp3");
            audio.play();
            healthBar.updateHealth(health);
          }
        }

        if (enemies.length <= 0) {
          var audio = new Audio("sounds/Party.mp3");
          audio.play();
          setTimeout(() => {
            alert(
              "Победа \nНажмите «ОК» и подождите, чтобы перезапустить игру. \nЕсли игра не загружается, нажмите еще раз."
            );
            location.reload();
            window.location.href = "index.html";
          }, 100);
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
      clearTimeout(swordTimeout);
      swordTimeout = setTimeout(() => {
        hasSword = false;
        player.style.backgroundColor = "black";
      }, 8000);
      console.log("Has a sword:", hasSword);
    }
  }
}

function handleSwordAttack(event) {
  if (event.key === " " && hasSword) {
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      const enemyTop = parseInt(enemy.style.top);
      const enemyLeft = parseInt(enemy.style.left);
      const player = document.querySelector(".player");
      const playerTop = parseInt(player.style.top);
      const playerLeft = parseInt(player.style.left);

      if (
        Math.abs(playerTop - enemyTop) <= cellSize &&
        Math.abs(playerLeft - enemyLeft) <= cellSize
      ) {
        gridElement.removeChild(enemy);
        enemies.splice(i, 1);
        enemy.style.opacity = 0;
        enemy.style.display = "none";
        var audio = new Audio("sounds/Sword-Effect.mp3");
        audio.play();
        console.log("gg", hasSword);
        break;
      }
    }
  }
}
document.addEventListener("keydown", handleSwordAttack);


addPlayer();
