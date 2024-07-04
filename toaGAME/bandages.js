let bandages = [];
function addHeals() {
  for (let i = 0; i < 10; i++) {
    const bandage = document.createElement("div");
    bandage.className = "heals";
    bandage.style.backgroundImage = "url('images/heart.png')";
    bandage.style.backgroundSize = "contain";
  
    let newRow, newCol;

    do {
      newRow = Math.floor(Math.random() * map.length);
      newCol = Math.floor(Math.random() * map[0].length);
    } while (map[newRow][newCol] === "w");

    bandage.style.top = `${newRow * cellSize}px`;
    bandage.style.left = `${newCol * cellSize}px`;
    gridElement.appendChild(bandage);
    bandages.push(bandage);
  }
}

addHeals();