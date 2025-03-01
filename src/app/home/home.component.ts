import { Component, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { HomeService } from './home.service';
import { Task, TasksPaginated } from './task.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  imports: [
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks: Task[] = [];
  tasksPaginated!: TasksPaginated;
  currentPageTasks: Task[] = [];
  loading: boolean = false;
  displayedColumns: string[] = ['title'];
  dataSource = new MatTableDataSource<Task>([]);
  total = 0;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private homeService: HomeService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.loadTasks();
  }

  loadTasks(pageIndex: number = 0, pageSize: number = this.pageSize) {
    this.loading = true;
    this.homeService.getPaginated(pageIndex, pageSize).subscribe({
      next: (tasks) => {
        // this.tasks = tasks.tasks;
        this.tasksPaginated = tasks;
        this.total = tasks.totalCount;
        this.updatePageData();
      },
      error: (err) => {
        console.log(err)
        this.router.navigate(["/login"])

      },
      complete: () => this.loading = false,
    });
  }

  removeTask(task: Task) {
    const id = task.id!;
    this.loading = true;

    this.homeService.removeTask(id).subscribe({
      next: (res) => {
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
      this.loadTasks(0, 10)
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  updatePageData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageTasks = this.tasks.slice(start, end);
  }

  onPageChanged(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePageData();
    this.loadTasks(this.pageIndex, this.pageSize);
  }

}
