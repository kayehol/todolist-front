import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../task.interface';

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
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
  formTask: FormGroup;
  readonly dialogRef = inject(MatDialogRef<TaskDialogComponent>);
  readonly task = inject<Task>(MAT_DIALOG_DATA);

  constructor() {
    this.formTask = new FormGroup({
      title: new FormControl<string>('', Validators.required),
      description: new FormControl<string>('', Validators.required),
      done: new FormControl<boolean>(false, Validators.required),
    });

    if (this.task)
      this.formTask.patchValue(this.task)
  }

  salvar() {

  }

  cancelar() {
    this.dialogRef.close();
  }
}
