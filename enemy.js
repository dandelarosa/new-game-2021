class Enemy {
  static WIDTH = 20;
  static HEIGHT = 20;
  static SPEED = -5;
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = Enemy.WIDTH;
    this.height = Enemy.HEIGHT;
  }

  update() {
    this.x = this.x + Enemy.SPEED;
  }

  draw(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, Enemy.WIDTH, Enemy.HEIGHT);
  }

  isOutOfBounds() {
    return this.x < -Enemy.WIDTH;
  }
}
