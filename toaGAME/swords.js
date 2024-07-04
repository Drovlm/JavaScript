let swords = [];
function addSwords() {
  for (let i = 0; i < 2; i++) {
    const sword = document.createElement("div");
    sword.className = "swords";
    sword.style.backgroundImage = "url('images/sword.png')";
    sword.style.backgroundSize = "contain";
  
    let newRow, newCol;

    do {
      newRow = Math.floor(Math.random() * map.length);
      newCol = Math.floor(Math.random() * map[0].length);
    } while (map[newRow][newCol] === "w");

    sword.style.top = `${newRow * cellSize}px`;
    sword.style.left = `${newCol * cellSize}px`;
    gridElement.appendChild(sword);
    swords.push(sword);
  }
}

addSwords();