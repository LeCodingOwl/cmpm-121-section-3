// Worked with Madison
import * as Phaser from "phaser";

import starfieldUrl from "/assets/starfield.png";

export default class Play extends Phaser.Scene {
  fire?: Phaser.Input.Keyboard.Key;
  left?: Phaser.Input.Keyboard.Key;
  right?: Phaser.Input.Keyboard.Key;

  starfield?: Phaser.GameObjects.TileSprite;
  spaceship?: Phaser.GameObjects.Shape;

  isFiring?: false;

  rotationSpeed = Phaser.Math.PI2 / 1000; // radians per millisecond

  constructor() {
    super("play");
  }

  preload() {
    this.load.image("starfield", starfieldUrl);
  }

  #addKey(
    name: keyof typeof Phaser.Input.Keyboard.KeyCodes,
  ): Phaser.Input.Keyboard.Key {
    return this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes[name]);
  }

  create() {
    this.fire = this.#addKey("F");
    this.left = this.#addKey("LEFT");
    this.right = this.#addKey("RIGHT");
    this.isFiring;

    this.starfield = this.add
      .tileSprite(
        0,
        0,
        this.game.config.width as number,
        this.game.config.height as number,
        "starfield",
      )
      .setOrigin(0, 0);

    const width = 10;
    const height = 10;

    this.spaceship = this.add.rectangle(
      (this.game.config.width as number) / 2,
      (this.game.config.height as number) - 10,
      width,
      height,
      0x70ef80,
    );
    this.spaceship!.setOrigin(0, 0);
  }

  update() {
    this.starfield!.tilePositionX -= 4;

    if (this.left!.isDown) {
      this.spaceship!.x -= 5;
    }
    if (this.right!.isDown) {
      this.spaceship!.x += 5;
    }

    if (this.fire!.isDown) {
      //this.isFiring! = true;
      this.spaceship!.y -= 5;

      this.tweens.add({
        targets: this.spaceship,
        scale: { from: 1.5, to: 1 },
        duration: 300,
        ease: Phaser.Math.Easing.Sine.Out,
      });
    }
  }
}
