import { Directive, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';

@Directive()
export abstract class FormComponent<
  T extends { [K in keyof T]: AbstractControl<any, any> }
> implements OnInit
{
  protected readonly fb = inject(NonNullableFormBuilder);

  public form!: FormGroup<T>;

  public ngOnInit(): void {
    this.form = this.buildForm();
  }

  protected abstract buildForm(): FormGroup<T>;

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.onSubmitValidForm();
  }

  protected abstract onSubmitValidForm(): void;
}
