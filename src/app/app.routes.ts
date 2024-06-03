import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlaySinglesComponent } from './components/play-singles/play-singles.component';
import { GroupPlayComponent } from './components/group-play/group-play.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'play-singles', component: PlaySinglesComponent },
  { path: 'group-play', component: GroupPlayComponent },
];
