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
};
