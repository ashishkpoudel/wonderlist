import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-password-confirm-dialog',
  templateUrl: './password-confirm-dialog.component.html',
  styleUrls: ['./password-confirm-dialog.component.css']
})
export class PasswordConfirmDialogComponent implements OnInit {

  form = this.formBuilder.group({
    'current_password' : ['', [Validators.required]]
  });

  constructor(
    private passwordConfirmDialog: MatDialogRef<PasswordConfirmDialogComponent>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  proceedClick() {
    this.passwordConfirmDialog.close(this.form.value);
  }

  closeClick() {
    this.passwordConfirmDialog.close();
  }

}
