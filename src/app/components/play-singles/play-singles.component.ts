import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-play-singles',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './play-singles.component.html',
  styleUrl: './play-singles.component.scss',
})
export class PlaySinglesComponent {
  maxNumInQuestion: number = 10;
  question = {
    firstNum: '',
    secondNum: '',
    equationSymbol: '',
    answer: '',
    options: <Array<String>>[],
  };
  optionDocs!: NodeListOf<Element>;
  message: { text: string; type: string } | null = null;
  answered: boolean = false;
  answer: 'correct' | 'wrong' | null = null;

  constructor(private soundService: SoundService) {
    this.generateQuestion();
  }

  ngAfterViewInit(): void {
    this.optionDocs = document.querySelectorAll('.option');
  }

  getRandomNum(max: number): number {
    return Math.floor(Math.random() * max + 1);
  }

  convertToArabicNumbers(number: number | string) {
    number = String(number);

    var id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.replace(/[0-9]/g, function (w: any) {
      return id[+w];
    });
  }

  generateEquation() {
    let maxSecondNum = this.maxNumInQuestion;
    const firstNum = this.getRandomNum(this.maxNumInQuestion);

    const equationSymbol = this.getRandomNum(2);
    if (equationSymbol === 1) {
      this.question.equationSymbol = '+';
    } else {
      this.question.equationSymbol = '-';
      maxSecondNum = firstNum;
    }

    const secondNum = this.getRandomNum(maxSecondNum);

    const answer =
      equationSymbol === 1 ? firstNum + secondNum : firstNum - secondNum;

    this.question.firstNum = this.convertToArabicNumbers(firstNum);
    this.question.secondNum = this.convertToArabicNumbers(secondNum);
    this.question.answer = this.convertToArabicNumbers(answer);
  }

  generateWrongOption(): string {
    let option: string = this.convertToArabicNumbers(
      this.getRandomNum(this.maxNumInQuestion * 2),
    );

    const optionIndexExists = this.question.options.indexOf(option);
    if (optionIndexExists >= 0) {
      return this.generateWrongOption();
    }

    return option;
  }

  generateOptions() {
    const indexOfCorrectAnswer = this.getRandomNum(4) - 1;

    this.question.options[indexOfCorrectAnswer] = this.question.answer;

    for (let i = 0; i < 4; i++) {
      if (!this.question.options[i]) {
        this.question.options[i] = this.generateWrongOption();
      }
    }
  }

  generateQuestion() {
    this.generateEquation();
    this.generateOptions();
  }

  chooseOption(option: String, i: number) {
    if (!this.answered) {
      const optionDoc = this.optionDocs[i];
      let className: string, text: string;

      if (this.question.answer === option) {
        this.soundService.playCorrectSound();
        className = 'correct';
        text = 'أحسنت اختيار الإجابة الصحيحة';
      } else {
        this.soundService.playInCorrectSound();
        className = 'wrong';
        text = 'الإجابة خاطئة حاول التركيز المرة القادمة';
      }

      this.answered = true;

      optionDoc.classList.add(className);

      setTimeout(() => {
        this.message = { text, type: className };
        this.answer = <any>className;
      }, 500);
    }
  }

  regenerateQuestion(): void {
    this.question = {
      firstNum: '',
      secondNum: '',
      equationSymbol: '',
      answer: '',
      options: [],
    };
    this.message = null;
    this.answered = false;
    this.answer = null;
    this.optionDocs.forEach((optionDoc) => {
      optionDoc.classList.remove('correct');
      optionDoc.classList.remove('wrong');
    });
    this.generateQuestion();
  }
}
