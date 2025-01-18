export interface GameMapDto<T = object> {
  id: string;
  title: string;
  data: T;
  difficulty: Difficulty;
  enemyRate: number;
}

export interface CreateGameMapDto<T = object> {
  title: string;
  data: T;
  difficulty: Difficulty;
  enemyRate: number;
}

export enum Difficulty {
  'EASY' = 1,
  'NORMAL',
  'HARD',
}
