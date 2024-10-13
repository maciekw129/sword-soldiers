import { Character, Gender } from '@data-access/users';
import { CreateUserOptions } from './create-user.model';

export const options: CreateUserOptions = {
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
