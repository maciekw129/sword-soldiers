import {
  ComponentRef,
  Directive,
  ElementRef,
  inject,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Location } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { PrimeIcons } from 'primeng/api';
import { useCssVariable } from '@utils/injection-hooks';

@Directive({
  standalone: true,
  selector: 'section[uiBackLink], div[uiBackLink]',
})
export class BackLinkDirective implements OnInit {
  private readonly location = inject(Location);
  private readonly viewContainterRef = inject(ViewContainerRef);
  private readonly elementRef = inject(ElementRef);

  private buttonComponentRef: ComponentRef<ButtonComponent> = null;
  private readonly space3 = useCssVariable('--space-3');

  public ngOnInit(): void {
    this.buttonComponentRef = this.createButtonComponent();
    this.setInputs();
    this.setStyle();
    this.setOnClick();
  }

  private createButtonComponent(): ComponentRef<ButtonComponent> {
    const buttonComponentRef =
      this.viewContainterRef.createComponent(ButtonComponent);
    const hostNativeElement = this.elementRef.nativeElement;

    hostNativeElement.insertBefore(
      buttonComponentRef.location.nativeElement,
      hostNativeElement.firstChild
    );

    return buttonComponentRef;
  }

  private setInputs(): void {
    this.buttonComponentRef.setInput('label', 'Back');
    this.buttonComponentRef.setInput('design', 'link');
    this.buttonComponentRef.setInput('icon', PrimeIcons.ARROW_LEFT);
  }

  private setStyle(): void {
    const hostNativeElement = this.elementRef.nativeElement;
    const buttonNativeElement = this.buttonComponentRef.location.nativeElement;

    hostNativeElement.style.setProperty('position', 'relative');

    buttonNativeElement.style.setProperty('position', 'absolute');
    buttonNativeElement.style.setProperty('top', this.space3);
    buttonNativeElement.style.setProperty('left', this.space3);
  }

  private setOnClick(): void {
    this.buttonComponentRef.instance.onClick.subscribe(() =>
      this.location.back()
    );
  }
}
