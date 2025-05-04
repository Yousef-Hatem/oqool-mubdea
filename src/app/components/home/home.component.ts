import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FunMathematicsPopupComponent } from '../fun-mathematics-popup/fun-mathematics-popup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FunMathematicsPopupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  showFunMathematicsPopup: boolean = false;
  sections: Array<{ title: string; img: string; router: string; click?: any }> =
    [
      {
        title: 'اللعب الفردي',
        img: '1.png',
        router: '/play-singles',
      },
      {
        title: 'اللعب الجماعي',
        img: '2.jpg',
        router: '/group-play',
      },
      // {
      //   title: 'الكتاب التفاعلي',
      //   img: '3.jpeg',
      //   router: '',
      // },
      // {
      //   title: 'التعزيز الأسبوعي',
      //   img: '4.png',
      //   router: '',
      // },
      // {
      //   title: 'مبدعون متميزون',
      //   img: '5.jpeg',
      //   router: '',
      // },
      // {
      //   title: 'بصمتك دليل تميزك',
      //   img: '6.jpeg',
      //   router: '',
      // },
      {
        title: 'الرياضيات الممتعة',
        img: '7.jpeg',
        router: '',
        click: () => {
          setTimeout(() => (this.showFunMathematicsPopup = true), 0);
        },
      },
      // {
      //   title: 'إدارة الأسئلة',
      //   img: '8.jpg',
      //   router: '',
      // },
      // {
      //   title: 'المفكرة التعليمية',
      //   img: '9.jpeg',
      //   router: '',
      // },
    ];

  hideFunMathematicsPopup(): void {
    this.showFunMathematicsPopup = false;
  }
}
