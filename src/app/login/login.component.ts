import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinner,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public formLogin: FormGroup;
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.formLogin = new FormGroup({
      login: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
    });
  }

  login() {
    this.loading = true;
    const { login, password } = this.formLogin.value;

    this.authService.login(login, password).subscribe({
      next: (res) => {
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
