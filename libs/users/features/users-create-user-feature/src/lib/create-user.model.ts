import { FormControl } from '@angular/forms';
import { Character, Gender } from '@users/data-access';

export interface CreateUserControls {
  name: FormControl<string>;
  gender: FormControl<Gender | null>;
  character: FormControl<Character | null>;
}
