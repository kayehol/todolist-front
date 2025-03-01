import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../task.interface';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-task-dialog',
  imports: [
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinner,
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
  formTask: FormGroup;
  loading: boolean = false;
  readonly dialogRef = inject(MatDialogRef<TaskDialogComponent>);
  readonly task = inject<Task>(MAT_DIALOG_DATA);

  constructor(
    private homeService: HomeService,
    private router: Router
  ) {
    this.formTask = new FormGroup({
      title: new FormControl<string>('', Validators.required),
      description: new FormControl<string>('', Validators.required),
      done: new FormControl<boolean>(false, Validators.required),
    });

    if (this.task)
      this.formTask.patchValue(this.task)
  }

  save() {
    this.loading = true;
    const payload = this.formTask.value;

    if (this.task) {
      const updated = {
        ... this.task,
        title: payload.title,
        description: payload.description,
        done: payload.done,
      };

      this.homeService.updateTask(updated).subscribe({
        next: () => {
          this.cancel();
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => {
          this.loading = false;
        },
      })
    } else {
      this.homeService.createTask(payload).subscribe({
        next: () => {
          this.cancel();
        },
        error: () => {

        },
        complete: () => {
          this.loading = false;
        },
      })
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
