import { FormControl } from '@angular/forms';
import { Character, Gender } from '@users/data-access';

export interface BasicDataControls {
  name: FormControl<string>;
  gender: FormControl<Gender>;
  character: FormControl<Character>;
}
