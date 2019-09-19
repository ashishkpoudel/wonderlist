import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialogRef } from "@angular/material/dialog";
import { User, UserService } from "src/app/core";

@Component({
  selector: 'app-edit-password-dialog',
  templateUrl: './edit-password-dialog.component.html',
  styleUrls: ['./edit-password-dialog.component.css']
})
export class EditPasswordDialogComponent implements OnInit {

  user: User;

  editPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private editPasswordDialog: MatDialogRef<EditPasswordDialogComponent>,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) {
    this.editPasswordForm = this.formBuilder.group({
      'password': [''],
      'password_confirmation': [''],
      'current_password': ['']
    });
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
  }

  saveClick() {
    this.userService.updatePassword(this.user.id, this.editPasswordForm.value).subscribe(
      data => {
        this.snackBar.open('Password updated', 'Dismiss', {
          duration: 1200,
          horizontalPosition: "left",
          verticalPosition: "bottom"
        });

        this.editPasswordDialog.close();
      },
      error => {
        if (422 === error.status) {
          const errors = error.error.errors;
          for (let key in errors) {
            if (errors.hasOwnProperty(key)) {
              this.editPasswordForm.controls[key].setErrors({
                serverError: errors[key][0]
              })
            }
          }
        }
      }
    )
  }

  closeClick() {
    this.editPasswordDialog.close();
  }

}
