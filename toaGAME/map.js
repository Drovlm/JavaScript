const gridElement = document.querySelector(".grid");
const cellSize = 25;
const imageSrcMap = {
  'w': 'images/wall2.jpg',
  'p': 'images/street2.png',
};
const map = [
  "wwwwwwpwwwwwwpwppppppwwppppwwpppwwwwwwww",
  "wwwwwwpwwwwwwpwppppppwwppppwwpppwwwwwwww",
  "wwwwwwpwwwwwwpwppppppwwwwwwwwwwwwwwwwwww",
  "pppppppppppppppppppppppppppppppppppppppp",
  "wwwwwwppppwwwppppwwwppwwwpwwwpppppwwwwww",
  "wwwwwwppppwwwppppwwwppwwwpwwwpppppwwwwww",
  "wwwwwwpwwpwwwppppwwwppwwwpwwwwwwwwwwwwww",
  "pppppppppppppppppppppppppppppppppppppppp",
  "wwwwwwpwppwwwpppwwwwpwwwwpwwwwwwwwppppww",
  "wwwwwwpwppwwwpppwwwwpwppppwpppppppwwwwww",
  "pppppppppppppppppppppppppppppppppppppppp",
  "wwwwwwpwppwwwpwwwwwwpwppppwpppppppwwwwww",
  "wwwwwwpwppwwwpppwwwwpwwwwpwwwwwwwwppppww",
  "pppppppppppppppppppppppppppppppppppppppp",
  "wpwwwwpwpwwwwpwwwwwwpwwwwwwwwpppwwwwpwww",
  "wpwwwwpwpwwwwppppppppwwwwwwwwpppwwwwpwww",
  "wppppppppwwwwpwwwwwwppppppwwwpppwwwwpwww",
  "wpwwwwpwwwpppppppwwwpwwwppwwwpppwwwwpwww",
  "wpwwwwpwwwpwwpwwpwwwpwwwpppppppppppppwww",
  "wpwwwwpwpppwwpwwpppwpwwwwwwwwpppwwwwwwww",
  "pppppppppppppppppppppppppppppppppppppppp",
  "wwwwwwpwwwwwwpwwwwwwpwwwwwwwwpppwwwwwwww",
  "wwwwwwpwwwwwwpwwwwwwpwwwwwwwwpppwwwwwwww",
  "wwwwwwpwwwwwwpwwwwwwpwwwwwwwwpppwwwwwwww",
];
let enemies = [];

        function initializeMap() {
            for (let i = 0; i < map.length; i++) {
                for (let j = 0; j < map[i].length; j++) {
                    const cell = document.createElement("div");
                    cell.classList.add("cell");
                    const image = document.createElement("img");
                    image.style.width = cellSize + "px";
                    image.style.height = cellSize + "px";
                    if (map[i][j] === "w") {
                        cell.classList.add("wall");
                        image.src = imageSrcMap['w'];
                    } else if (map[i][j] === "p") {
                        cell.classList.add("path");
                        image.src = imageSrcMap['p'];
                    }
                    cell.appendChild(image);
                    gridElement.appendChild(cell);
                }
            }
        }
initializeMap();



{/*const gridElement = document.querySelector(".grid");
const cellSize = 25; // Ensure the cell size matches the CSS

const map = [
  "wwwwwwpwwwwwwpwppppppwwppppwwpppwwwwwwww",
  "wwwwwwpwwwwwwpwppppppwwppppwwpppwwwwwwww",
  "wwwwwwpwwwwwwpwppppppwwwwwwwwwwwwwwwwwww",
  "pppppppppppppppppppppppppppppppppppppppp",
  "wwwwwwppppwwwppppwwwppwwwpwwwpppppwwwwww",
  "wwwwwwppppwwwppppwwwppwwwpwwwpppppwwwwww",
  "wwwwwwpwwpwwwppppwwwppwwwpwwwwwwwwwwwwww",
  "pppppppppppppppppppppppppppppppppppppppp",
  "wwwwwwpwppwwwpppwwwwpwwwwpwwwwwwwwppppww",
  "wwwwwwpwppwwwpppwwwwpwppppwpppppppwwwwww",
  "pppppppppppppppppppppppppppppppppppppppp",
  "wwwwwwpwppwwwpwwwwwwpwppppwpppppppwwwwww",
  "wwwwwwpwppwwwpppwwwwpwwwwpwwwwwwwwppppww",
  "pppppppppppppppppppppppppppppppppppppppp",
  "wwwwwwpwwwwwwpwwwwwwpwwwwwwwwpppwwwwwwww",
  "wwwwwwpwwwwwwpwwwwwwpwwwwwwwwpppwwwwwwww",
  "wwwwwwpwwwwwwpwwwwwwpwwwwwwwwpppwwwwwwww",
  "wwwwwwpwwwpppppppwwwpwwwwwwwwpppwwwwwwww",
  "wwwwwwpwwwpwwpwwpwwwpwwwwwwwwpppwwwwwwww",
  "wwwwwwpwpppwwpwwpppwpwwwwwwwwpppwwwwwwww",
  "pppppppppppppppppppppppppppppppppppppppp",
  "wwwwwwpwwwwwwpwwwwwwpwwwwwwwwpppwwwwwwww",
  "wwwwwwpwwwwwwpwwwwwwpwwwwwwwwpppwwwwwwww",
  "wwwwwwpwwwwwwpwwwwwwpwwwwwwwwpppwwwwwwww",
];

function initializeMap() {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (map[i][j] === "w") cell.classList.add("wall");
      else if (map[i][j] === "p") cell.classList.add("path");
      gridElement.appendChild(cell);
    }
  }
}
initializeMap();*/}


