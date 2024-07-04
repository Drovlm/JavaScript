import { HealthBar } from './health.js';
import { initializeMap } from './map.js';
import { addPlayer, checkCollision } from './player.js';
import { addEnemies, moveRandomly } from './enemies.js';
import { addHeals } from './bandages.js';
import { addSwords } from './swords.js';

function startGame() {
  
  initializeMap();
  const player = addPlayer() && checkCollision();
  const enemies = addEnemies() && moveRandomly();
  const bandages = addHeals();
  const health = HealthBar();
  const swords = addSwords();


}

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector("button");
  startButton.addEventListener("click", startGame);
});
