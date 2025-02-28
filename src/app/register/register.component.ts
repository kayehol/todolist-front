import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public formRegister: FormGroup;
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.formRegister = new FormGroup({
      login: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
    });
  }

  send() {
    this.loading = true;
    const payload = this.formRegister.value;

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.router.navigate(["/login"])
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.loading = false;
      }
    })
  }
}
