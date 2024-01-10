import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  state: 'verified' | 'unverified';
}

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class UserInfoComponent implements OnInit {
  private _id: number = 0;
  user: User = { id: 0, first_name: '', last_name: '', state: 'unverified' };
  loading: boolean = false;
  userNotFound: boolean = false;

  @Input()
  set id(value: number) {
    this._id = value;

    this.loadUser();
  }
  get id(): number {
    return this._id;
  }

  ngOnInit(): void {
    this.loadUser();
  }

  public loadUser() {
    this.loading = true;
    this.userNotFound = false;

    this.getUser$(this._id).subscribe((user: User) => {
      this.user = user;
      this.loading = false;
    });
  }

  getUser$(id: number): Observable<User> {
    const state = Math.random() > 0.5 ? 'verified' : 'unverified';
    const userSuccess: User = { id, first_name: 'John', last_name: 'Smith', state };

    if (Math.random() > 0.5) {
      return of(userSuccess).pipe(delay(2500));
    }

    this.loading = false;
    this.userNotFound = true;
    return throwError(() => new Error(`User with id ${id} not found`));
  }
}
