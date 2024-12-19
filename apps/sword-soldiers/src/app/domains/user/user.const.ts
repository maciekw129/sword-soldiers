import { Character, Gender } from '@data-access/users';
import { UserOptions } from './user.model';

export const GENDER_LABELS: Record<Gender, string> = {
  [Gender.MALE]: 'Male',
  [Gender.FEMALE]: 'Female',
};

export const CHARACTER_LABELS: Record<Character, string> = {
  [Character.KNIGHT]: 'Knight',
  [Character.DWARF]: 'Dwarf',
  [Character.ELF]: 'Elf',
};

export const OPTIONS: UserOptions = {
  gender: [
    { value: Gender.MALE, label: 'Male' },
    { value: Gender.FEMALE, label: 'Female' },
  ],
  character: [
    { value: Character.KNIGHT, label: 'Knight' },
    { value: Character.ELF, label: 'Elf' },
    { value: Character.DWARF, label: 'Dwarf' },
  ],
};
