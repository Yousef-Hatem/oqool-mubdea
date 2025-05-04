import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private audio = new Audio();

  constructor() {}

  playSound(path: string): void {
    this.audio.src = `assets/sounds/${path}`;
    this.audio.load();
    this.audio.play();
  }

  playCorrectSound(): void {
    this.playSound('correct.wav');
  }

  playInCorrectSound(): void {
    this.playSound('incorrect.wav');
  }
}
