import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserDetails(username: string) {
    return this.http.get<any>(`http://localhost:3000/api/user/${username}`);
  }
}
