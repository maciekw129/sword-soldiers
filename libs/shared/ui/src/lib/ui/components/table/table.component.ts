import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TableAction, TableColumn } from './table.model';
import { InvokePipe } from '@utils/pipes';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'ui-table',
  standalone: true,
  templateUrl: 'table.component.html',
  imports: [TableModule, InvokePipe, Button, Tooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> {
  public readonly value = input.required<T[]>();
  public readonly columns = input.required<TableColumn<T>[]>();
  public readonly actions = input<TableAction<T>[]>([]);
  public readonly isLoading = input(false);
}
