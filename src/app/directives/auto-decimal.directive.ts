import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoDecimal]',
})
export class AutoDecimalDirective {
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value: string) {
    this.el.value = this.parseValue(value);
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    this.el.value = this.formatValue(value);
  }

  private parseValue(value: string): string {
    return value.replace(/[^0-9.]/g, '');
  }

  private formatValue(value: string): string {
    const parsedValue = this.parseValue(value);
    const floatValue = parseFloat(parsedValue);
    return floatValue.toFixed(2);
  }
}
