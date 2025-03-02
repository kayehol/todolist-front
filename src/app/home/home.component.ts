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
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

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
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.homeService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        console.log(err)
        this.router.navigate(["/login"])

      }
    });
  }

  addTask() {

  }

  updateTask(task: Task) {

  }

  removeTask(task: Task) {
    console.log({ task })
    const id = task.id!;
    this.loading = true;

    this.homeService.removeTask(id).subscribe({
      next: (res) => {
        console.log(res)
        this.loadTasks();
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.loading = false;
      },
    })

  }

  openTaskModal(task?: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: task
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTasks()
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
