class HealthBar {
  constructor(x, y, w, h, maxHealth, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.maxHealth = maxHealth;
    this.maxWidth = w;
    this.health = maxHealth;
    this.color = color;
  }

  show(health) {
    health.lineWidth = 5;
    health.strokeStyle = "black";
    health.fillStyle = this.color;
    health.fillRect(this.x, this.y, this.w, this.h);
    health.strokeRect(this.x, this.y, this.maxWidth, this.h);
    
  }

  updateHealth(val) {
    if (val >= 0) {
      this.health = val;
      this.w = (this.health / this.maxHealth) * this.maxWidth;
    }
  }
}
