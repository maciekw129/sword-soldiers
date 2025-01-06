import { Character, Gender } from '@users/api';

export const enum PlayerSprite {
  KNIGHT_MALE = 'KNIGHT_MALE',
  KNIGHT_FEMALE = 'KNIGHT_FEMALE',
  ELF_MALE = 'ELF_MALE',
  ELF_FEMALE = 'ELF_FEMALE',
  DWARF_MALE = 'DWARF_MALE',
  DWARF_FEMALE = 'DWARF_FEMALE',
}

export const playerSpriteUrls: Record<PlayerSprite, string> = {
  [PlayerSprite.KNIGHT_MALE]: 'game-assets/sprites/knight_male.png',
  [PlayerSprite.KNIGHT_FEMALE]: 'game-assets/sprites/knight_female.png',
  [PlayerSprite.ELF_MALE]: 'game-assets/sprites/elf_male.png',
  [PlayerSprite.ELF_FEMALE]: 'game-assets/sprites/elf_female.png',
  [PlayerSprite.DWARF_MALE]: 'game-assets/sprites/dwarf_male.png',
  [PlayerSprite.DWARF_FEMALE]: 'game-assets/sprites/dwarf_female.png',
};

export const playerSpriteMap: Record<
  Character,
  Record<Gender, PlayerSprite>
> = {
  [Character.KNIGHT]: {
    [Gender.MALE]: PlayerSprite.KNIGHT_MALE,
    [Gender.FEMALE]: PlayerSprite.KNIGHT_FEMALE,
  },
  [Character.DWARF]: {
    [Gender.MALE]: PlayerSprite.DWARF_MALE,
    [Gender.FEMALE]: PlayerSprite.DWARF_FEMALE,
  },
  [Character.ELF]: {
    [Gender.MALE]: PlayerSprite.ELF_MALE,
    [Gender.FEMALE]: PlayerSprite.ELF_FEMALE,
  },
};
