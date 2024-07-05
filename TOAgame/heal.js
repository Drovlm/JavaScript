const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = canvas.width = 600;
const height = canvas.height = 30;


let health = 100;
const healthBarWidth = 500;
const healthBarHeight = 25;
const x = width / 2 - healthBarWidth / 2;
const y = height / 2 - healthBarHeight / 2;

const healthBar = new HealthBar(x, y, healthBarWidth, healthBarHeight, health, "green");

const frame = function() {
  context.clearRect(0, 0, width, height);
  healthBar.show(context);
  requestAnimationFrame(frame);
}
setInterval(function() {
    if (health <= 0) {
      alert("Поражение! \nНажмите «ОК» и подождите, чтобы перезапустить игру. \nЕсли игра не загружается, нажмите еще раз.");
      location.reload();
      window.location.href = "index.html"; 
    }
  } ,1000);

frame();