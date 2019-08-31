import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";
import { UserService } from "src/app/core";
import { PasswordConfirmDialogComponent } from "./password-confirm-dialog/password-confirm-dialog.component";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingComponent implements OnInit {

  private _changePasswordChecked: boolean = false;

  set changePasswordChecked(value: boolean) {
    this._changePasswordChecked = value;
    this.toggleChangePasswordValidators(value);
  }

  get changePasswordChecked(): boolean { return this._changePasswordChecked; }

  settingForm = this.formBuilder.group({
    'name': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'password': [''],
    'retype_password': [''],
  });

  constructor(
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit() {

  }

  saveClick() {
    const dialogRef = this.matDialog.open(PasswordConfirmDialogComponent, {
      width: '400px',
      position: {
        top: '130px'
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data && data.current_password) {
        this.settingForm.controls['current_password'].setValue(data.current_password);
        this.userService.update(this.userService.getCurrentUser().id, this.settingForm.value).subscribe(
          data => { },
          error => {
            console.log(error);
          }
        )
      }
    });
  }

  toggleChangePasswordValidators(value: boolean) {
    if (true === value) {
      this.settingForm.controls['password'].setValidators([Validators.required]);
      this.settingForm.controls['retype_password'].setValidators([Validators.required]);
      return;
    }

    this.settingForm.controls['password'].clearValidators();
    this.settingForm.controls['password'].updateValueAndValidity();
    this.settingForm.controls['retype_password'].clearValidators();
    this.settingForm.controls['retype_password'].updateValueAndValidity();
  }

}
