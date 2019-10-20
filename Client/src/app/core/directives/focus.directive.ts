import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnInit{

  @Input('appFocus') focus: boolean;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (true === this.focus) {
      this.el.nativeElement.focus();
    }
  }

}
