import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task, TasksPaginated } from "./task.interface";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private url = "http://localhost:5195/api";

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}/tasks`);
  }

  getPaginated(pageIndex: number, pageSize: number): Observable<TasksPaginated> {
    return this.http.get<TasksPaginated>(`${this.url}/tasks/paginated?page=${pageIndex + 1}&pageSize=${pageSize}`);
  }

  createTask(task: Task): Observable<any> {
    return this.http.post<Task>(`${this.url}/tasks`, task);
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put<Task>(`${this.url}/tasks/${task.id}`, task);
  }

  removeTask(id: number): Observable<any> {
    return this.http.delete<number>(`${this.url}/tasks/${id}`);
  }
}
