import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core';
import { User } from 'src/app/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  currentUser: User;

  constructor(
    private router: Router,
    private userService: UserService,
  ){}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

  logoutClick() {
    this.userService.logout();
    this.router.navigate(['']);
  }

}
