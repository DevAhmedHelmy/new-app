import { ElementRef } from '@angular/core';
import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'appDropdown',
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;
  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event']) toggleOpen() {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
}
