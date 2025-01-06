import AnimationManager = Phaser.Animations.AnimationManager;

export const createPlayerAnims = (anims: AnimationManager): void => {
  anims.create({
    key: 'idle',
    frames: anims.generateFrameNumbers('player', {
      frames: [0, 1, 2, 3],
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: 'run',
    frames: anims.generateFrameNumbers('player', {
      frames: [4, 5, 6, 7],
    }),
    frameRate: 10,
    repeat: -1,
  });
};
