import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiUrl = '/api'; // Relative URL works in production

  constructor(private http: HttpClient) { }

  getMessage(): Observable<any> {
    return this.http.get(`${this.apiUrl}/hello`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  postUser(name: string) {
    return this.http.post<{ success: boolean, user: { name: string, id: number } }>(`${this.apiUrl}/users`, { name });
  }

  deleteUser(id: string) {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/user/` + id);
  }
}
