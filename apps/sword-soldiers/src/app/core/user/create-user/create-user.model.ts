import { FormControl } from '@angular/forms';
import { Character, Gender } from '@data-access/users';
import { SelectButtonsOption } from '@ui/controls';

export interface CreateUserControls {
  name: FormControl<string>;
  gender: FormControl<Gender | null>;
  character: FormControl<Character | null>;
}

export interface CreateUserOptions {
  gender: SelectButtonsOption<Gender>[];
  character: SelectButtonsOption<Character>[];
}
