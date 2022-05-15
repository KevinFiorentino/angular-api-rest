import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials, Login, User } from 'src/app/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  loginUser(credentials: Credentials): Observable<Login> {
    return this.http.post<Login>(`https://example.com/api/login`, credentials);
  }

  getProfileUser(): Observable<User> {
    /* const token = localStorage.getItem('platzi_token'); */
    return this.http.get<User>(`https://example.com/api/profile`);
    /* {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } */
  }

}
