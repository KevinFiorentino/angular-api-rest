import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private http: HttpClient,
  ) { }

  getFile(urlFile: string): Promise<any> {
    return fetch(urlFile, {
      method: 'GET',
    });
  }

  uploadFile(file: Blob): Observable<any> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post(`https://example.com/api/files`, form, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    });
  }

}
