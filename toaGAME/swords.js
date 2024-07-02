function addSwords() {
    for (let i = 0; i < 2; i++) {
      const player = document.createElement("div");
      player.className = "swords";
      let newRow, newCol;
  
      do {
        newRow = Math.floor(Math.random() * map.length);
        newCol = Math.floor(Math.random() * map[0].length);
      } while (map[newRow][newCol] === "w" || map[newRow][newCol] === "o"); // Skip cells that are walls or objects
  
      player.style.top = `${newRow * cellSize}px`;
      player.style.left = `${newCol * cellSize}px`;
      gridElement.appendChild(player);
  
  
      document.addEventListener("keydown", (event) => {
        const newRow = newTop / cellSize;
        const newCol = newLeft / cellSize;
        if (
          newRow >= 0 &&
          newRow < map.length &&
          newCol >= 0 &&
          newCol < map[0].length &&
          map[newRow][newCol] === "p"
        ) {
          player.style.top = `${newTop}px`;
          player.style.left = `${newLeft}px`;
        }
      });
    }
  }
  
  addSwords();