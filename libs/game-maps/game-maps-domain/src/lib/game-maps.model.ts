import { SelectButtonsOption } from '@ui/controls';
import { Difficulty } from '@game-maps/data-access';

export interface GameMapsOptions {
  difficulty: SelectButtonsOption<Difficulty>[];
}
