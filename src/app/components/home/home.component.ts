import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  sections: Array<{ title: string; img: string }> = [
    {
      title: 'اللعب الفردي',
      img: '1.png',
    },
    {
      title: 'اللعب الجماعي',
      img: '2.jpg',
    },
    {
      title: 'الكتاب التفاعلي',
      img: '3.jpeg',
    },
    {
      title: 'التعزيز الأسبوعي',
      img: '4.png',
    },
    {
      title: 'مبدعون متميزون',
      img: '5.jpeg',
    },
    {
      title: 'بصمتك دليل تميزك',
      img: '6.jpeg',
    },
    {
      title: 'الرياضيات الممتعة',
      img: '7.jpeg',
    },
    {
      title: 'إدارة الأسئلة',
      img: '8.jpg',
    },
    {
      title: 'المفكرة التعليمية',
      img: '9.jpeg',
    },
  ];
}
