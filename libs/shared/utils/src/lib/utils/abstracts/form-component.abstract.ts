import { Directive, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';

@Directive()
export abstract class FormComponent<
  T extends { [K in keyof T]: AbstractControl<unknown, unknown> }
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

  public onReset(): void {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  protected abstract onSubmitValidForm(): void;
}
