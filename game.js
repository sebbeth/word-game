import {
  GROUND_POSITION,
  PLAYER_JUMP_FORCE,
  applyGravity,
  applyPlayerMovement,
  isTouchingGround,
} from "./physics.js";

const objectsWithMass = [];

function objectFactory(
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
  const sprite = PIXI.Sprite.from("assets/ground.png");
  sprite.height = GROUND_POSITION;
  sprite.width = app.view.width;
  sprite.y = app.view.height - sprite.height;
  app.stage.addChild(sprite);
}

function createBackground() {
  const sprite = PIXI.Sprite.from("assets/paper.png");
  sprite.height = app.view.height;
  sprite.width = app.view.width;
  app.stage.addChild(sprite);
}

function createButton(x, y, scale, text, onClick) {
  // TODO, make this better
  const basicText = new PIXI.Text(text);
  const button = PIXI.Sprite.from("assets/button.png");
  button.x = x;
  button.y = y;
  button.scale = scale;
  button.anchor.set(0.5);
  button.alpha = 0.7;
  button.eventMode = "static";
  button.cursor = "pointer";
  button.addChild(basicText);
  button.on("pointerdown", onClick);
  app.stage.addChild(button);
}

function createUI(player) {
  createButton(100, 100, { x: 0.5, y: 0.5 }, "<", () => {
    movePlayer({ player, direction: "left" });
  });
  createButton(350, 100, { x: 0.5, y: 0.5 }, "^", () => {
    movePlayer({ player, direction: "jump" });
  });
  createButton(600, 100, { x: 0.5, y: 0.5 }, ">", () => {
    movePlayer({ player, direction: "right" });
  });
}

function createTree(x, y) {
  const sprite = PIXI.Sprite.from("assets/tree.png");
  sprite.scale.x = 0.2;
  sprite.scale.y = 0.2;
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 1;
  sprite.x = x;
  sprite.y = y;
  app.stage.addChild(sprite);
}

function movePlayer(params = { player, direction }) {
  const { direction, player } = params;
  switch (direction) {
    case "left":
      if (isTouchingGround(app, player)) {
        player.velocity.x = player.velocity.x - 1;
      }
      break;

    case "right":
      console.log(player.velocity);
      if (isTouchingGround(app, player)) {
        player.velocity.x += 1;
      }
      break;

    case "jump":
      if (isTouchingGround(app, player)) {
        player.velocity.y = -PLAYER_JUMP_FORCE;
      }
      break;

    default:
      break;
  }
}

// Create the application helper and add its render target to the page
let app = new PIXI.Application({ resizeTo: window });
document.body.appendChild(app.view);

createBackground();
createGround();
const player = objectFactory({
  x: 100,
  y: app.view.height - GROUND_POSITION - 50,
  height: 60,
  width: 40,
  texture: "assets/lilguy.png",
  hasMass: true,
});
createUI(player);

[30, 150, 204, 300, 412, 434, 484, 600, 221, 650].forEach((x) =>
  createTree(x, app.view.height - GROUND_POSITION + 20)
);

// Listen for animate update
app.ticker.add((delta) => {
  applyPlayerMovement(app, delta, player);
  applyGravity(app, delta, objectsWithMass);
});
