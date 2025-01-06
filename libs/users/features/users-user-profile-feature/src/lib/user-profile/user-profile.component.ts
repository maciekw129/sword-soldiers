import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { InputTextComponent, SelectButtonsComponent } from '@ui/controls';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfileControls } from './user-profile.model';
import { ButtonComponent } from '@ui/components';
import { FormComponent } from '@utils/abstracts';
import { tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CHARACTER_LABELS, GENDER_LABELS, OPTIONS } from '@users/domain';
import {
  Character,
  Gender,
  UserDto,
  UsersHttpService,
  usersStore,
} from '@users/data-access';

@Component({
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    InputTextComponent,
    ReactiveFormsModule,
    ButtonComponent,
    SelectButtonsComponent,
  ],
})
export class UserProfileComponent
  extends FormComponent<UserProfileControls>
  implements OnInit
{
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

  override ngOnInit() {
    super.ngOnInit();
    console.log(this.user());
  }

  protected buildForm(): FormGroup<UserProfileControls> {
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
    this.isLoading.set(true);

    if (userId) {
      this.usersHttpService
        .updateUser$(userId, this.form.getRawValue())
        .pipe(
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
        )
        .subscribe();
    }
  }

  public get user(): Signal<UserDto | null> {
    return this.userStore.user;
  }
}
