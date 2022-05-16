import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpContextToken, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';

const ADD_TOKEN = new HttpContextToken<boolean>(() => true);

export function addToken() {
  return new HttpContext().set(ADD_TOKEN, false);
}

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(ADD_TOKEN)) {
      request = this.addHeaders(request);
      return next.handle(request);
    } else
      return next.handle(request);
  }

  private addHeaders(request: HttpRequest<any>) {
    let token: string | null = '';
    token = localStorage.getItem('platzi_token');
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else
      return request;
  }

}
