import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[bmZoom]'
})
export class ZoomDirective {
  // Access the Host element
  @HostBinding('class.small') isZoomed: boolean;

  // Host listener when focus gets on the element
  @HostListener('mouseenter') onMouseEnter() {
    this.isZoomed = true;
  }

  // Host listener when focus gets off the element
  @HostListener('mouseleave') onmouseleave() {
    this.isZoomed = false;
  }

}
