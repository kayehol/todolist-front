import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinner,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public formLogin: FormGroup;
  private snackbar = inject(MatSnackBar);
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.formLogin = new FormGroup({
      login: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
      confirmPassword: new FormControl<string>('', Validators.required),
    });
  }

  login() {
    this.loading = true;
    const { login, password, confirmPassword } = this.formLogin.value;
    console.log(login, password, confirmPassword)

    if (password !== confirmPassword) {
      this.snackbar.open('Credenciais inválidas', 'Ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000
      });
      this.loading = false;
      return;
    }

    this.authService.login(login, password).subscribe({
      next: (res) => {
        this.snackbar.open('Sucesso', 'Ok', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000
        });
        this.authService.setToken(res.token);
        this.router.navigate(["/home"])
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
