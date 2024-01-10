import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class UserInfoComponent implements OnInit {
  _id: any;
  user: any;
  loading: boolean = false;

  @Input()
  set id(value: any) {
    this._id = value;

    this.loadUser();
  }
  get id(): any {
    return this._id;
  }

  ngOnInit(): void {
    this.loadUser();
  }

  public loadUser() {
    this.loading = true;

    getUser$(this._id).subscribe((user) => {
      this.user = user;
      this.loading = false;
    });
  }
}

function getUser$(id: any): Observable<any> {
  const state = Math.random() > 0.5 ? 'verified' : 'unverified';
  const userSuccess = { id, first_name: 'John', last_name: 'Smith', state };
  if (Math.random() > 0.5) {
    return of(userSuccess).pipe(delay(2500));
  }
  return throwError(() => new Error(`User with id ${id} not found`));
}
