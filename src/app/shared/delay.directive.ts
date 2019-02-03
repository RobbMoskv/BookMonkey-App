import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[bmDelay]'
})
export class DelayDirective implements OnInit {

  // Insertion time as argument
  @Input() bmDelay;

  constructor(private tempRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    setTimeout(() => {
      // Return template by callback function
      this.viewContainerRef.createEmbeddedView(this.tempRef);
    },
      this.bmDelay
    );
  }
}

