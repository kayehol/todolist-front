import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { HomeService } from './home.service';
import { Task } from './task.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks: Task[] = [];

  constructor(private homeService: HomeService) {
    this.loadTasks();
  }

  loadTasks() {
    this.homeService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  addTask() {

  }

  updateTask() {

  }

  removeTask() {

  }
}
