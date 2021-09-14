class Bullet {
  static WIDTH = 10;
  static HEIGHT = 10;
  static SPEED = 25;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    this.x = this.x + Bullet.SPEED;
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, Bullet.WIDTH, Bullet.HEIGHT);
  }
}
