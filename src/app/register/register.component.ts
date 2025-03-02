import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public formRegister: FormGroup;
  loading: boolean = false;
  private snackbar = inject(MatSnackBar);

  constructor(private authService: AuthService, private router: Router) {
    this.formRegister = new FormGroup({
      login: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
      confirmPassword: new FormControl<string>('', Validators.required),
    });
  }

  openSnack(message: string) {
    this.snackbar.open(message, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  send() {
    this.loading = true;
    const { login, password, confirmPassword } = this.formRegister.value;
    const payload = { login, password };

    if (password !== confirmPassword) {
      this.loading = false;
      return;
    }
    this.authService.register(payload).subscribe({
      next: (res) => {
        this.openSnack(res.message);
        this.router.navigate(["/login"])
      },
      error: (err) => {
        this.openSnack(err.message);
      },
      complete: () => {
        this.loading = false;
      }
    })
  }
}
