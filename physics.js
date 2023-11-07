export const GROUND_POSITION = 50;
export const GRAVITY = 0.3;
export const PLAYER_JUMP_FORCE = 4;
export const GROUND_FRICTION = 0.02;

export function isTouchingGround(app, sprite) {
  const feetPosition = sprite.y + sprite.height / 2 + 5; // add some padding

  if (feetPosition > app.view.height - GROUND_POSITION) {
    return true;
  }
  return false;
}

export function applyGravity(app, delta, objectsWithMass) {
  objectsWithMass.forEach((sprite) => {
    if (isTouchingGround(app, sprite) && sprite.velocity.y > 0) {
      sprite.velocity.y = 0;
      sprite.y = app.view.height - GROUND_POSITION - sprite.height / 2;
      return;
    }
    sprite.velocity.y = sprite.velocity.y + GRAVITY * delta;
    sprite.y += sprite.velocity.y * delta;
  });
}

export function applyPlayerMovement(app, delta, player) {
  const leftWall = 0;
  const rightWall = app.view.width;

  if (player.x - player.width / 2 < leftWall) {
    player.x = leftWall + player.width / 2;
    player.velocity.x = 0;
  }
  if (player.x + player.width / 2 > rightWall) {
    player.x = rightWall - player.width / 2;
    player.velocity.x = 0;
  }

  if (Math.abs(player.velocity.x) > 0) {
    player.velocity.x =
      player.velocity.x > 0
        ? player.velocity.x - GROUND_FRICTION
        : player.velocity.x + GROUND_FRICTION;
  }
  player.x += player.velocity.x * delta;
}
