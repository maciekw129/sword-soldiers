import { SelectButtonsOption } from '@ui/controls';
import { Character, Gender } from '@data-access/users';

export interface UserOptions {
  gender: SelectButtonsOption<Gender>[];
  character: SelectButtonsOption<Character>[];
}
