import { FormControl } from '@angular/forms';
import { Character, Gender } from '@data-access/users';

export interface CreateUserControls {
  name: FormControl<string>;
  gender: FormControl<Gender | null>;
  character: FormControl<Character | null>;
}
