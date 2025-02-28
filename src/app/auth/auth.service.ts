import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "localhost:5765/api/auth";

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.url}/register`, user);
  }

  login(login: string, password: string): Observable<any> {
    const body = { login, password };

    return this.http.post<any>(`${this.url}/login`, body);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return token !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
  }

}
