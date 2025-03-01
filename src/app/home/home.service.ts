import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "./task.interface";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private url = "http://localhost:5195/api";

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}/tasks`);
  }
}
