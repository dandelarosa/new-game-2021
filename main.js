const KEY_SPACE = 32;
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_DOWN_BACKQUOTE = 192;
let keyState = {};

const GAME_WIDTH = 640;
const GAME_HEIGHT = 480;
const canvas = document.getElementById('gameCanvas');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
const ctx = canvas.getContext('2d');

let charX = 40;
let charY = 100;
let charWidth = 20;
let charHeight = 20;
const CHAR_SPEED = 5;

let canShoot = true;
let bullets = [];

let enemyTimer = 0;
const ENEMY_DELAY = 30;
let enemies = [];

let score = 0;

let intervalID = setInterval(() => {
  try {
    eachFrame();
  }
  catch(e) {
    clearInterval(intervalID);
    throw e;
  }
}, 33);

function eachFrame() {
  if (keyState[KEY_LEFT_ARROW]) {
    charX = charX - CHAR_SPEED;
  }
  if (keyState[KEY_RIGHT_ARROW]) {
    charX = charX + CHAR_SPEED;
  }
  if (keyState[KEY_UP_ARROW]) {
    charY = charY - CHAR_SPEED;
  }
  if (keyState[KEY_DOWN_ARROW]) {
    charY = charY + CHAR_SPEED;
  }
  if (keyState[KEY_DOWN_BACKQUOTE]) {
    activateDebug();
  }

  if (charX < 0) charX = 0;
  if (charX > GAME_WIDTH - charWidth) charX = GAME_WIDTH - charWidth;
  if (charY < 0) charY = 0;
  if (charY > GAME_HEIGHT - charHeight) charY = GAME_HEIGHT - charHeight;

  bullets.forEach(bullet => bullet.update());
  // Don't move bullet the same frame it is created
  if (keyState[KEY_SPACE] && canShoot) {
    bullets.push(new Bullet(charX + (charWidth - Bullet.WIDTH) / 2, charY + (charHeight - Bullet.HEIGHT) / 2));
    canShoot = false;
  }
  else if (!keyState[KEY_SPACE]) {
    canShoot = true;
  }

  enemies.forEach(enemy => enemy.update());
  if (enemyTimer++ === ENEMY_DELAY) {
    const enemyY = (GAME_HEIGHT - Enemy.HEIGHT) * Math.random();
    enemies.push(new Enemy(GAME_WIDTH, enemyY));
    enemyTimer = 0;
  }

  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < enemies.length; j++) {
      if (objectsCollide(bullets[i], enemies[j])) {
        bullets.splice(i--, 1);
        enemies.splice(j--, 1);
        score += 1;
        break;
      }
    }
  }

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = 'red';
  ctx.fillRect(charX, charY, charWidth, charHeight);

  bullets.forEach(bullet => bullet.draw(ctx));
  enemies.forEach(enemy => enemy.draw(ctx));

  ctx.fillStyle = 'white';
  ctx.font = '24px sans-serif';
  ctx.fillText('Score: ' + score, 10, 30);

  drawDebug();

  // Clean up memory
  console.log('number of bullets: ', bullets.length);
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    if (bullet.x > GAME_WIDTH * 2) {
      bullets.splice(i--, 1);
    }
  }
  console.log('number of enemies: ', enemies.length);
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if (enemy.isOutOfBounds()) {
      enemies.splice(i--, 1);
    }
  }
}

document.addEventListener('keydown', onKeydown);

function onKeydown(event) {
  keyState[event.keyCode] = true;
}

document.addEventListener('keyup', onKeyup);

function onKeyup(event) {
  keyState[event.keyCode] = false;
}

function objectsCollide(first, second) {
  if (first.x > second.x + second.width) {
    return false;
  }
  else if (first.x + first.width < second.x) {
    return false;
  }
  else if (first.y > second.y + second.height) {
    return false;
  }
  else if (first.y + first.height < second.y) {
    return false;
  }
  else {
    return true;
  }
}
