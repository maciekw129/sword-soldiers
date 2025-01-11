import {
  ComponentRef,
  DestroyRef,
  Directive,
  HostListener,
  inject,
  input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormControlDirective, FormControlStatus } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  combineLatest,
  defer,
  distinctUntilChanged,
  filter,
  merge,
  of,
  startWith,
  Subject,
  tap,
} from 'rxjs';
import { ErrorComponent } from '../../components';
import { FormSubmitDirective } from './form-submit.directive';
import { isEqual } from '@utils/functions';

@Directive({
  selector: '[formControl]',
  standalone: true,
})
export class ControlErrorDirective implements OnInit {
  public validationErrorsContent = input<Record<string, string>>({});

  private errorComponent!: ComponentRef<ErrorComponent>;

  private readonly control = inject(FormControlDirective);
  private readonly formSubmitDirective = inject(FormSubmitDirective, {
    optional: true,
  });
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  @HostListener('blur') listenOnBlur() {
    this.initializeErrorState$.next();
    this.control.control.markAsDirty();
  }

  private initializeErrorState$ = new Subject<void>();

  private listenFormSubmit$ = defer(() => {
    if (this.formSubmitDirective !== null) {
      return this.formSubmitDirective.formSubmit$.pipe(
        tap(() => this.initializeErrorState$.next())
      );
    }

    return of(null).pipe(tap(() => this.initializeErrorState$.next()));
  });

  private updateErrorMessage$ = defer(() =>
    combineLatest([
      this.control.statusChanges!.pipe(startWith(this.control.status)),
      this.control.valueChanges!.pipe(
        startWith(this.control.value),
        distinctUntilChanged()
      ),
      this.initializeErrorState$,
    ]).pipe(
      filter(() => Boolean(this.control.touched)),
      distinctUntilChanged((previous, current) => isEqual(previous, current)),
      tap(([status]) => this.updateErrorMessage(status))
    )
  );

  ngOnInit(): void {
    this.instantiateErrorComponent();

    merge(this.listenFormSubmit$, this.updateErrorMessage$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private instantiateErrorComponent(): void {
    this.errorComponent = this.viewContainerRef.createComponent(ErrorComponent);
    this.errorComponent.setInput(
      'validationErrorsContent',
      this.validationErrorsContent()
    );
  }

  private updateErrorMessage(status: FormControlStatus): void {
    this.errorComponent.setInput(
      'error',
      status === 'INVALID' ? this.getFirstErrorMessage() : ''
    );
  }

  private getFirstErrorMessage(): string {
    const errors = this.control.errors;

    if (errors === null) {
      return '';
    }

    return Object.keys(errors)[0];
  }
}
