export const GROUND_POSITION = 50;
export const GRAVITY = 0.03;
export const GAME_HEIGHT = 400;
export const GAME_WIDTH = 800;

export function hasHitGround(sprite) {
  const feetPosition = sprite.y + sprite.height / 2;
  if (feetPosition > GAME_HEIGHT - GROUND_POSITION) {
    return true;
  }
  return false;
}

export function applyGravity(delta, objectsWithMass) {
  objectsWithMass.forEach((sprite) => {
    if (hasHitGround(sprite)) {
      sprite.velocity = 0;
      return;
    }
    sprite.velocity.y = sprite.velocity.y + GRAVITY * delta;
    sprite.y += sprite.velocity.y * delta;
  });
}
