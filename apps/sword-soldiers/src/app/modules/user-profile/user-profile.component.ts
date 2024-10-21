import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { InputTextComponent } from '@ui/controls';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserProfileControls } from './user-profile.model';
import { ButtonComponent } from '@ui/components';
import { FormComponent } from '@utils/abstracts';
import { tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { characterLabels, genderLabels } from '../../core/user/user.const';
import { UserDto, UsersService, usersStore } from '@data-access/users';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputTextComponent, ReactiveFormsModule, ButtonComponent],
})
export class UserProfileComponent
  extends FormComponent<UserProfileControls>
  implements OnInit
{
  private readonly userStore = inject(usersStore);
  private readonly userService = inject(UsersService);
  private readonly messageService = inject(MessageService);
  private readonly authService = inject(AuthService);

  override ngOnInit() {
    super.ngOnInit();
  }

  public readonly genderLabels = genderLabels;
  public readonly characterLabels = characterLabels;

  public isEditMode = signal(false);
  public isLoading = signal(false);

  constructor() {
    super();

    effect(() => {
      if (!this.isEditMode()) {
        this.form.reset(this.user() ?? {});
      }
    });
  }

  protected buildForm(): FormGroup<UserProfileControls> {
    return this.fb.group({
      name: this.fb.control(this.user()?.name ?? ''),
    });
  }

  protected override onSubmitValidForm(): void {
    const userId = this.userStore.user()?.id;
    this.isLoading.set(true);

    if (userId) {
      this.userService
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
