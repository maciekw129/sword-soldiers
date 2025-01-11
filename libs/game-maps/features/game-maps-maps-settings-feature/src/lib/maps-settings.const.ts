import { MapsRoutes } from './maps-settings.model';
import { TableColumn } from '@ui/components';
import { GameMapDto } from '@game-maps/data-access';
import { DIFFICULTY_LABELS } from '@game-maps/domain';

export const MAPS_PATHS: Record<MapsRoutes, string> = {
  [MapsRoutes.CREATE]: 'create',
};

export const MAPS_TABLE_COLUMNS: TableColumn<GameMapDto>[] = [
  {
    fieldName: 'title',
    label: 'Title',
  },
  {
    fieldName: 'difficulty',
    label: 'Difficulty',
    transform: ({ difficulty }) => DIFFICULTY_LABELS[difficulty],
  },
  {
    fieldName: 'enemyRate',
    label: 'Enemy rate',
  },
];
