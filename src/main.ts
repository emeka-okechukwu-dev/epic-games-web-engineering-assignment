import 'zone.js';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { UserInfoComponent } from './user-info/user-info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserInfoComponent],
  template: `
    <h1>Refactor user-info component</h1>
    <p>Please make changes only inside user-info folder</p>

    <app-user-info [id]="userId"></app-user-info>
  `,
})
export class App {
  public readonly userId = 25;
}

bootstrapApplication(App);
