import {
  GAME_HEIGHT,
  GAME_WIDTH,
  GROUND_POSITION,
  applyGravity,
} from "./physics.js";

const objectsWithMass = [];

function spriteFactory(
  params = {
    x,
    y,
    width,
    height,
    texture,
    hasMass,
  }
) {
  const { x, y, texture, width, height, hasMass = false } = params;
  const sprite = PIXI.Sprite.from(
    texture ?? "https://pixijs.com/assets/bunny.png"
  );
  sprite.anchor.set(0.5);
  sprite.x = x;
  sprite.y = y;
  sprite.width = width ?? sprite.width;
  sprite.height = height ?? sprite.height;
  sprite.velocity = { x: 0, y: 0 };
  app.stage.addChild(sprite);
  if (hasMass) {
    objectsWithMass.push(sprite);
  }
  return sprite;
}

function createGround() {
  const obj = new PIXI.Graphics();
  obj.beginFill(0x008000);
  obj.drawRect(0, GAME_HEIGHT - GROUND_POSITION, GAME_WIDTH, GROUND_POSITION);
  app.stage.addChild(obj);
}

function getBunny() {
  const bunny = PIXI.Sprite.from("https://pixijs.com/assets/bunny.png");

  // center the sprite's anchor point
  bunny.anchor.set(0.5);

  // move the sprite to the center of the screen
  bunny.on("pointerdown", () => {
    bunny.scale.x *= 1.25;
  });
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;
  return bunny;
}
// Create the application helper and add its render target to the page
let app = new PIXI.Application({ width: GAME_WIDTH, height: GAME_HEIGHT });
document.body.appendChild(app.view);

createGround();

const box = spriteFactory({ x: 100, y: 100, hasMass: true });

// Listen for animate update
app.ticker.add((delta) => {
  //   bunny.rotation += 0.1 * delta;
  // apply gravity
  applyGravity(delta, objectsWithMass);
});
