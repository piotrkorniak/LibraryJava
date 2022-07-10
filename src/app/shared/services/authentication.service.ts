import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRoles } from '../models/user-roles.enum';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationResponse } from '../models/response/authentication-response';
import { CustomMessageService } from './custom-message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router, private customMessageService: CustomMessageService) {
  }

  public register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${environment.apiUrl}/authentication/register`, {
        firstName,
        lastName,
        email,
        password
      })
      .pipe(
        tap((response) => {
          this.handleAuthentication(
            response.id,
            response.email,
            response.firstName,
            response.lastName,
            response.role,
            response.token
          );
          this.customMessageService.pushSuccessMessage('Template.Success.Success', 'Template.Success.Register');
        })
      );
  }

  public login(email: string, password: string): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${environment.apiUrl}/authentication/login`, { email, password })
      .pipe(
        tap((response) => {
          this.handleAuthentication(
            response.id,
            response.email,
            response.firstName,
            response.lastName,
            response.role,
            response.token
          );
          this.customMessageService.pushSuccessMessage('Template.Success.Success', 'Template.Success.Login');
        })
      );
  }

  autoLogin(): void {
    const userDataInLocalStorage: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: UserRoles;
      token: string;
    } = JSON.parse(localStorage.getItem('user'));

    if (!userDataInLocalStorage) {
      this.router.navigate(['authentication']);
      return;
    }

    const loadedUser = new User(
      userDataInLocalStorage.id,
      userDataInLocalStorage.email,
      userDataInLocalStorage.firstName,
      userDataInLocalStorage.lastName,
      userDataInLocalStorage.role,
      userDataInLocalStorage.token
    );


    this.user$.next(loadedUser);
  }

  public logout(): void {
    this.router.navigate(['authentication']);
    this.user$.next(null);
  }

  private handleAuthentication(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    role: UserRoles,
    token: string
  ): void {
    const user = new User(id, email, firstName, lastName, role, token);
    this.user$.next(user);
    this.router.navigate(['/books']);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
