import { Component, OnInit } from '@angular/core';

import { UserService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Client';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.populate();
  }

  logout() {
    this.userService.logout();
  }

}
