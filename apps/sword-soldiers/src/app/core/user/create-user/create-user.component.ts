import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@utils/abstracts';
import { CreateUserControls } from './create-user.model';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  UsersService,
  Character,
  Gender,
  usersStore,
} from '@data-access/users';
import {
  FormSubmitDirective,
  InputTextComponent,
  SelectButtonsComponent,
} from '@ui/controls';
import { ButtonComponent } from '@ui/components';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { options } from './create-user.const';

@Component({
  standalone: true,
  templateUrl: 'create-user.component.html',
  styleUrl: 'create-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormSubmitDirective,
    InputTextComponent,
    SelectButtonsComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
})
export class CreateUserComponent extends FormComponent<CreateUserControls> {
  private readonly userService = inject(UsersService);
  private userStore = inject(usersStore);
  private readonly router = inject(Router);

  public readonly options = options;

  protected buildForm(): FormGroup<CreateUserControls> {
    return this.fb.group({
      name: this.fb.control('', { validators: Validators.required }),
      gender: this.fb.control<Gender | null>(null, {
        validators: Validators.required,
      }),
      character: this.fb.control<Character | null>(null, {
        validators: Validators.required,
      }),
    });
  }

  protected onSubmitValidForm(): void {
    this.userService
      .createUser$(this.form.getRawValue())
      .pipe(
        tap((user) => {
          this.userStore.setUser(user);
          this.router.navigate(['/']);
        })
      )
      .subscribe();
  }
}
