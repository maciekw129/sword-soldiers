import { Demon } from './demon/demon';
import { Enemy } from './enemy';
import { ExtendsClass } from '@utils/types';
import { Scene } from 'phaser';
import { BaseEntity } from '../base-entity';

export const enemyTypes: Record<
  string,
  ExtendsClass<Enemy, [Scene, number, number, BaseEntity]>
> = {
  Demon,
};
