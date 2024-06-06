import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fun-mathematics-popup',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './fun-mathematics-popup.component.html',
  styleUrl: './fun-mathematics-popup.component.scss',
})
export class FunMathematicsPopupComponent {
  @Output() hideEvent = new EventEmitter();

  constructor() {}

  ngAfterContentInit(): void {
    const d = <HTMLElement>document.querySelector('section');
    const hideEvent = this.hideEvent;
    d.addEventListener('click', function (e: any) {
      var target = e.target;
      if (!target.closest('.content')) {
        hideEvent.emit();
      }
    });
  }
}
