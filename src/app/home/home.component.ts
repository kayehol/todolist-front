import { Component, inject, ViewChild } from '@angular/core';
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../auth/user.interface';

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
    MatSnackBarModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private snackbar = inject(MatSnackBar);
  tasks: Task[] = [];
  user: User | undefined;
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
    this.getUser();
    this.loadTasks();
  }

  getUser() {
    this.authService.getUser().subscribe({
      next: (res: User) => {
        this.user = res;
        console.log('user', this.user)
      },
      error: (err) => {
        console.log(err)
      },
    });
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
    // todo: criar componente de confirmação
    if (confirm("Tem certeza?")) {
      const id = task.id!;
      this.loading = true;

      this.homeService.removeTask(id).subscribe({
        next: () => {
          this.snackbar.open('Tarefa removida', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000
          });
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
  }

  openTaskModal(task?: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        task: task,
        user: this.user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result === "load")
        this.loadTasks()
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
