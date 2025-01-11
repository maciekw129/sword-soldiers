import { FormControl } from '@angular/forms';
import { Difficulty } from '@game-maps/data-access';

export interface CreateMapControls {
  title: FormControl<string>;
  data: FormControl<string>;
  difficulty: FormControl<Difficulty | null>;
  enemyRate: FormControl<number | null>;
}
