import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Directive, Input, input, OnInit } from '@angular/core';

@Directive()
export abstract class CustomFormControl<T>
  implements ControlValueAccessor, OnInit
{
  public static nextId = 0;

  static generateControlId() {
    return `control-${CustomFormControl.nextId++}`;
  }

  public validationErrorsContent = input<Record<string, string>>({});
  public readOnly = input(false);

  public formControl!: FormControl<T>;
  public controlId = CustomFormControl.generateControlId();
  private _value!: T;
  private _disabled = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange = (value: T) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouch = () => {};

  constructor(private ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  public ngOnInit(): void {
    this.formControl = this.ngControl.control as FormControl<T>;
  }

  public writeValue(value: T): void {
    this._value = value;
    this.onChange(value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}
