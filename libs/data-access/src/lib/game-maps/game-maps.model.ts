export interface GameMapDto<T = unknown> {
  id: string;
  title: string;
  data: T;
  difficulty: Difficulty;
  enemyRate: number;
}

export interface CreateGameMapDto<T = unknown> {
  title: string;
  data: string;
  difficulty: Difficulty;
  enemyRate: number;
}

export const enum Difficulty {
  'EASY' = 1,
  'NORMAL',
  'HARD',
}
