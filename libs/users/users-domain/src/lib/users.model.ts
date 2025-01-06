import { SelectButtonsOption } from '@ui/controls';
import { Character, Gender } from '@users/data-access';

export interface UserOptions {
  gender: SelectButtonsOption<Gender>[];
  character: SelectButtonsOption<Character>[];
}
