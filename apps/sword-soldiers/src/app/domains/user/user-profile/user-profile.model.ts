import { FormControl } from '@angular/forms';
import { Character, Gender } from '@data-access/users';

export interface UserProfileControls {
  name: FormControl<string>;
  gender: FormControl<Gender>;
  character: FormControl<Character>;
}
