import AnimationManager = Phaser.Animations.AnimationManager;

export const createDemonAnims = (anims: AnimationManager): void => {
  anims.create({
    key: 'demon-idle',
    frames: anims.generateFrameNumbers('demon', {
      frames: [0, 1, 2, 3],
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: 'demon-run',
    frames: anims.generateFrameNumbers('demon', {
      frames: [4, 5, 6, 7],
    }),
    frameRate: 10,
    repeat: -1,
  });
};
