import { Demon } from './demon/demon';
import { Enemy } from './enemy';
import { ExtendsClass } from '@utils/types';

export const enemyTypes: Record<string, ExtendsClass<Enemy>> = {
  Demon,
};
