import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { UserService} from 'src/app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.isAuthenticated.pipe(take(1)).subscribe(data => {
      if (true === data) {
        this.router.navigateByUrl('manage/entries');
      }
    });
  }

  loginClick() {
    const login = this.loginForm.value;
    this.userService.login(login.email, login.password).subscribe(
      data => {
        this.router.navigateByUrl('manage/entries');
      },
      error => {
        this.snackBar.open('Invalid login', '', {
          duration: 800,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    );
  }

}
