let debug = false;

function activateDebug() {
  debug = true;
  canvas.height = GAME_HEIGHT * 2;
  console.log('debug mode on');
}

function drawDebug() {
  if (!debug) return;

  ctx.fillStyle = '#dddddd';
  ctx.fillRect(0, GAME_HEIGHT, GAME_WIDTH, GAME_HEIGHT);
}
