import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormComponent } from '@utils/abstracts';
import {
  FormSubmitDirective,
  InputNumberComponent,
  InputTextComponent,
  SelectButtonsComponent,
  TextareaComponent,
} from '@ui/controls';
import { CreateMapControls } from './create-map.model';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { OPTIONS } from '@game-maps/domain';
import { ButtonComponent } from '@ui/components';
import { BackLinkDirective } from '@ui/directives';
import { GameMapsHttpService } from '@game-maps/data-access';
import { defer, finalize, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: 'create-map.component.html',
  styleUrl: 'create-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormSubmitDirective,
    InputTextComponent,
    ReactiveFormsModule,
    TextareaComponent,
    SelectButtonsComponent,
    InputNumberComponent,
    ButtonComponent,
    BackLinkDirective,
  ],
})
export class CreateMapComponent extends FormComponent<CreateMapControls> {
  private readonly gameMapsHttpService = inject(GameMapsHttpService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  public readonly options = OPTIONS;

  public isLoading = signal(false);

  private readonly createMapRequest$ = defer(() => {
    const value = this.form.getRawValue();

    return this.gameMapsHttpService
      .createGameMap$({ ...value, data: JSON.parse(value.data) })
      .pipe(
        tap(() =>
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'You successfully added new map!',
          })
        ),
        finalize(() => this.isLoading.set(false))
      );
  });

  protected buildForm() {
    return this.fb.group({
      title: this.fb.control('', { validators: [Validators.required] }),
      data: this.fb.control('', { validators: [Validators.required] }),
      difficulty: this.fb.control(null, { validators: Validators.required }),
      enemyRate: this.fb.control(null, { validators: [Validators.required] }),
    });
  }

  protected onSubmitValidForm(): void {
    this.isLoading.set(true);

    this.createMapRequest$
      .pipe(
        tap(() =>
          this.router.navigate(['..'], { relativeTo: this.activatedRoute })
        )
      )
      .subscribe();
  }
}
