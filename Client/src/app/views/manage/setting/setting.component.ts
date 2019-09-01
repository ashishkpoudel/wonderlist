import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";

import { User, UserService } from "src/app/core";
import { EditPasswordDialogComponent } from "./edit-password-dialog/edit-password-dialog.component";
import { EditProfileDialogComponent } from "./edit-profile-dialog/edit-profile-dialog.component";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {

  user: User;

  constructor(
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe(data => {
      this.user = data;
    });
  }

  editProfileClick() {
    this.matDialog.open(EditProfileDialogComponent, {
      width: '450px'
    });
  }

  editPasswordClick() {
    this.matDialog.open(EditPasswordDialogComponent, {
      width: '450px'
    });
  }
}


