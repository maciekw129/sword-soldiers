import { Character, Gender } from '@data-access/users';

export const genderLabels: Record<Gender, string> = {
  [Gender.MALE]: 'Male',
  [Gender.FEMALE]: 'Female',
};

export const characterLabels: Record<Character, string> = {
  [Character.KNIGHT]: 'Knight',
  [Character.DWARF]: 'Dwarf',
  [Character.ELF]: 'Elf',
};
