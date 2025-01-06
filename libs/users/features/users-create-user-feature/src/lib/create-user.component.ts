import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormComponent } from '@utils/abstracts';
import { CreateUserControls } from './create-user.model';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  UsersHttpService,
  Character,
  Gender,
  usersStore,
} from '@users/data-access';
import {
  FormSubmitDirective,
  InputTextComponent,
  SelectButtonsComponent,
} from '@ui/controls';
import { ButtonComponent } from '@ui/components';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { OPTIONS } from '@users/domain';

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
  private readonly usersHttpService = inject(UsersHttpService);
  private userStore = inject(usersStore);
  private readonly router = inject(Router);

  public readonly options = OPTIONS;

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
    this.usersHttpService
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
