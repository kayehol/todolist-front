import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { HomeService } from './home.service';
import { Task } from './task.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-home',
  imports: [
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks: Task[] = [];
  loading: boolean = false;

  constructor(
    private homeService: HomeService,
    private dialog: MatDialog
  ) {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.homeService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.loading = false;
    })
  }

  addTask() {

  }

  updateTask(task: Task) {
    console.log(task)
  }

  removeTask() {

  }

  openTaskModal(task?: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed')
    });

  }
}
