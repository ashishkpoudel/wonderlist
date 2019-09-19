import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { User, UserService } from "src/app/core";

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {

  user: User;

  editProfileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private editProfileDialog: MatDialogRef<EditProfileDialogComponent>,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe(
      data => {
        this.user = data;
        this.editProfileForm = this.formBuilder.group({
          'name': [this.user.name],
          'email': [this.user.email]
        });
      }
    );
  }

  saveClick() {
    this.userService.updateProfile(this.user.id, this.editProfileForm.value).subscribe(
      data => {
        this.snackBar.open('Profile updated', 'Dismiss', {
          duration: 1200,
          horizontalPosition: "left",
          verticalPosition: "bottom"
        });

        this.editProfileDialog.close();
      },
      error => {
        if (422 === error.status) {
          const errors = error.error.errors;
          for (let key in errors) {
            if (errors.hasOwnProperty(key)) {
              this.editProfileForm.controls[key].setErrors({
                serverError: errors[key][0]
              })
            }
          }
        }
      }
    );
  }

  closeClick() {
    this.editProfileDialog.close();
  }

}

