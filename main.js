const KEY_SPACE = 32;
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
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

let bulletWidth = 10;
let bulletHeight = 10;
let bulletX = charX + (charWidth - bulletWidth) / 2;
let bulletY = charY + (charHeight - bulletHeight) / 2;
const BULLET_SPEED = 25;

setInterval(() => {
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

  if (charX < 0) charX = 0;
  if (charX > GAME_WIDTH - charWidth) charX = GAME_WIDTH - charWidth;
  if (charY < 0) charY = 0;
  if (charY > GAME_HEIGHT - charHeight) charY = GAME_HEIGHT - charHeight;

  if (keyState[KEY_SPACE]) {
    bulletX = charX + (charWidth - bulletWidth) / 2;
    bulletY = charY + (charHeight - bulletHeight) / 2;
  }
  else {
    bulletX = bulletX + BULLET_SPEED;
  }

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = 'red';
  ctx.fillRect(charX, charY, charWidth, charHeight);

  ctx.fillStyle = 'white';
  ctx.fillRect(bulletX, bulletY, bulletWidth, bulletHeight);
}, 33);

document.addEventListener('keydown', onKeydown);

function onKeydown(event) {
  keyState[event.keyCode] = true;
}

document.addEventListener('keyup', onKeyup);

function onKeyup(event) {
  keyState[event.keyCode] = false;
}
