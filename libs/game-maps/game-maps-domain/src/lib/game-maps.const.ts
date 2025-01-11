import { Difficulty } from '@game-maps/data-access';
import { GameMapsOptions } from './game-maps.model';

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  [Difficulty.EASY]: 'Easy',
  [Difficulty.NORMAL]: 'Normal',
  [Difficulty.HARD]: 'Hard',
};

export const OPTIONS: GameMapsOptions = {
  difficulty: [
    { value: Difficulty.EASY, label: DIFFICULTY_LABELS[Difficulty.EASY] },
    { value: Difficulty.NORMAL, label: DIFFICULTY_LABELS[Difficulty.NORMAL] },
    { value: Difficulty.HARD, label: DIFFICULTY_LABELS[Difficulty.HARD] },
  ],
};
