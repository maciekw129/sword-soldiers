import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Signal,
  signal,
} from '@angular/core';
import {
  Character,
  Gender,
  UserDto,
  UsersHttpService,
  usersStore,
} from '@users/data-access';
import { MessageService } from 'primeng/api';
import { CHARACTER_LABELS, GENDER_LABELS, OPTIONS } from '@users/domain';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BasicDataControls } from './basic-data.model';
import { Observable, tap } from 'rxjs';
import { FormComponent } from '@utils/abstracts';
import { ButtonComponent } from '@ui/components';
import {
  FormSubmitDirective,
  InputTextComponent,
  SelectButtonsComponent,
} from '@ui/controls';

@Component({
  standalone: true,
  templateUrl: 'basic-data.component.html',
  styleUrl: 'basic-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    InputTextComponent,
    FormSubmitDirective,
    ReactiveFormsModule,
    SelectButtonsComponent,
  ],
})
export class BasicDataComponent extends FormComponent<BasicDataControls> {
  private readonly userStore = inject(usersStore);
  private readonly usersHttpService = inject(UsersHttpService);
  private readonly messageService = inject(MessageService);

  public readonly genderLabels = GENDER_LABELS;
  public readonly characterLabels = CHARACTER_LABELS;
  public readonly options = OPTIONS;

  public isEditMode = signal(false);
  public isLoading = signal(false);

  constructor() {
    super();

    effect(() => {
      if (!this.isEditMode()) {
        this.form.reset(this.user());
      }
    });
  }

  protected buildForm(): FormGroup<BasicDataControls> {
    return this.fb.group({
      name: this.fb.control(this.user()?.name ?? '', {
        validators: Validators.required,
      }),
      gender: this.fb.control<Gender>(this.user()?.gender, {
        validators: Validators.required,
      }),
      character: this.fb.control<Character>(this.user()?.character, {
        validators: Validators.required,
      }),
    });
  }

  protected override onSubmitValidForm(): void {
    const userId = this.userStore.user()?.id;

    if (userId) {
      this.isLoading.set(true);

      this.getUpdateUserRequest$(userId).subscribe();
    }
  }

  private getUpdateUserRequest$(id: string): Observable<UserDto> {
    return this.usersHttpService.updateUser$(id, this.form.getRawValue()).pipe(
      tap((value) => {
        this.userStore.setUser(value);
        this.isEditMode.set(false);
        this.isLoading.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You successfully updated your profile!',
        });
      })
    );
  }

  public get user(): Signal<UserDto | null> {
    return this.userStore.user;
  }
}
