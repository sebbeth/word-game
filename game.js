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
let app = new PIXI.Application({ width: 640, height: 360 });
document.body.appendChild(app.view);

const bunny = getBunny();
app.stage.addChild(bunny);
// Listen for animate update
app.ticker.add((delta) => {
  // just for fun, let's rotate mr rabbit a little
  // delta is 1 if running at 100% performance
  // creates frame-independent transformation
  //   bunny.rotation += 0.1 * delta;
});
