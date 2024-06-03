import { AsyncPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { timer } from 'rxjs';
import { ArabicNumbersPipe } from '../../pipes/arabic-numbers.pipe';

@Component({
  selector: 'app-group-play',
  standalone: true,
  imports: [MatButtonModule, DatePipe, AsyncPipe, ArabicNumbersPipe],
  templateUrl: './group-play.component.html',
  styleUrl: './group-play.component.scss',
})
export class GroupPlayComponent {
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
  groups = [
    {
      name: 'فريق الابطال',
      number: 'first',
      time: 0,
      status: '',
      answers: <(1 | 0)[]>[],
      addedResults: false,
    },
    {
      name: 'فريق الملوك',
      number: 'second',
      time: 0,
      status: '',
      answers: <(1 | 0)[]>[],
      addedResults: false,
    },
    {
      name: 'فريق الأميرات',
      number: 'third',
      time: 0,
      status: '',
      answers: <(1 | 0)[]>[],
      addedResults: false,
    },
    {
      name: 'فريق القوة',
      number: 'fourth',
      time: 0,
      status: '',
      answers: <(1 | 0)[]>[],
      addedResults: false,
    },
  ];
  indexOfCurrentGroup: number = 0;
  groupsResult: { name: string; time: number; correct: number; wrong: null }[] =
    [];
  showResults: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.generateQuestion();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.optionDocs = document.querySelectorAll('.option');
      this.observableTimer();
    }
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
      const optionDoc = document.querySelectorAll('.option')[i];
      let className: string, text: string;

      if (this.question.answer === option) {
        className = 'correct';
        text = 'أحسنت اختيار الإجابة الصحيحة';
        this.groups[this.indexOfCurrentGroup].answers.push(1);
      } else {
        className = 'wrong';
        text = 'الإجابة خاطئة حاول التركيز المرة القادمة';
        this.groups[this.indexOfCurrentGroup].answers.push(0);
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
    document.querySelectorAll('.option').forEach((optionDoc) => {
      optionDoc.classList.remove('correct');
      optionDoc.classList.remove('wrong');
    });
    this.generateQuestion();
  }

  observableTimer() {
    this.groups[this.indexOfCurrentGroup].status = 'start';
    const source = timer(0, 1000);
    const abc = source.subscribe((val) => {
      if (this.groups[this.indexOfCurrentGroup].answers.length < 3) {
        this.groups[this.indexOfCurrentGroup].time = val;
      } else {
        abc.unsubscribe();
        this.groups[this.indexOfCurrentGroup].status = 'end';
      }
    });
  }

  getResultFromGroup(group: any) {
    const result = {
      name: group.name,
      time: group.time,
      correct: 0,
      wrong: 0,
    };

    group.answers.forEach((answer: number) => {
      if (answer === 1) {
        result.correct++;
      } else {
        result.wrong++;
      }
    });

    return result;
  }

  getTopGroupResult() {
    let topGroupResult: any = null;
    let index: any = null;
    this.groups.forEach((group, i) => {
      if (!group.addedResults) {
        if (topGroupResult) {
          const groupResult = this.getResultFromGroup(group);
          if (
            groupResult.correct > topGroupResult.correct ||
            (groupResult.correct === topGroupResult.correct &&
              groupResult.time < topGroupResult.time)
          ) {
            topGroupResult = groupResult;
            index = i;
          }
        } else {
          topGroupResult = this.getResultFromGroup(group);
          index = i;
        }
      }
    });

    return {
      groupResult: topGroupResult,
      i: index,
    };
  }

  gameOver() {
    for (let i = 0; i < this.groups.length; i++) {
      const topGroupResult = this.getTopGroupResult();
      this.groups[topGroupResult.i].addedResults = true;
      this.groupsResult.push(topGroupResult.groupResult);
    }

    this.showResults = true;
  }

  next() {
    if (this.groups[this.indexOfCurrentGroup].answers.length < 3) {
      this.regenerateQuestion();
    } else if (this.indexOfCurrentGroup < this.groups.length - 1) {
      this.indexOfCurrentGroup++;
      this.regenerateQuestion();
      this.observableTimer();
    } else {
      this.gameOver();
    }
  }

  removeGroupStatistics() {
    this.groups = this.groups.map((group) => {
      group.time = 0;
      group.answers = [];
      group.status = '';
      group.addedResults = false;
      return group;
    });
  }

  restartGame() {
    this.showResults = false;
    this.groupsResult = [];
    this.removeGroupStatistics();
    this.regenerateQuestion();
    this.indexOfCurrentGroup = 0;
    this.observableTimer();
  }
}
